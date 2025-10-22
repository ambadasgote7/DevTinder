const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const bcrypt = require('bcrypt');
const User = require('../models/user');

profileRouter.get('/profile/view', userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user); 
    } catch (err) {
        res.status(400).send("Error in adding user" + err.message);
    }
});

profileRouter.patch('/profile/edit', userAuth, async (req, res) => {
    try {
       
        if(!validateEditProfileData(req)) {
            throw new Error("Invalid Edit Fields");
        }
        const loggedInUser = req.user;
        console.log(loggedInUser);
        Object.keys(req.body).forEach(key => {
            loggedInUser[key] = req.body[key];
        });
        console.log(loggedInUser);

        await loggedInUser.save();

        res.json({
            message :`${loggedInUser.firstName}` + " your profile updated successfully",
            data : loggedInUser
        });

    } catch (err) {
        res.status(400).send("Error in updating user" + err.message);
    }
});

profileRouter.patch('/profile/password', async (req, res) => {
    try {
        const {emailId, password, newPassword } = req.body;

        if (!emailId || !password || !newPassword) {
            return res.status(400).send("All fields are required");
        }

        const user = await User.findOne({emailId: emailId});
            if (!user) {
                throw new Error("Invalid Credentails");
            }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send("Incorrect current password");
        } 

        const passwordHash = await bcrypt.hash(newPassword, 10);
        user.password = passwordHash;

        await user.save();

        res.send("Password changed successfully");

    } catch (err) {
        res.send("Error : " + err);
    }

});

module.exports = profileRouter;