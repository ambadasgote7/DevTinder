const express = require("express");
const authRouter = express.Router();
const {validateSignUpData} = require('../utils/validation');
const User = require("../models/user");
const bcrypt = require('bcrypt');
const validator = require('validator');
const cookieParser = require('cookie-parser');

authRouter.post("/signup", async (req, res) => {
       
    try {
        // Validation of data
        validateSignUpData(req);

        const {firstName, lastName, emailId, password} = req.body;

         // Encrypt the password
        const passwordHash = await bcrypt.hash(password, 10);

       // Creating a new instace 
         const user = new User({
            firstName, 
            lastName, 
            emailId, 
            password : passwordHash,
         });

        await user.save();
        res.send("User Added successfully");
    } catch (err) {
        res.status(400).send("Error in adding user" + err);
    }
});

authRouter.post('/login', async (req, res) => {
    
    try {
        const {emailId, password} = req.body; 
        if(!validator.isEmail(emailId)) {
            throw new Error("Enter valid email");
        }

        const user = await User.findOne({emailId: emailId});
        if (!user) {
            throw new Error("Invalid Credentails");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(isPasswordValid) {
            const token = await user.getJWT();

            res.cookie("token", token);
            res.send("Login Successful !!!");
        } else {
            throw new Error("Invalid Credentailst");
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

authRouter.post('/logout', async (req, res) => {
    // res.cookie("token", null, {
    //     expires : new Date(Date.now())
    // });
    res.clearCookie("token");
    res.send("Logged out successfully");
})


module.exports = authRouter;