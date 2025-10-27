const express = require('express');
const userRouter = express.Router();

const { userAuth } = require('../middlewares/auth');
const { ConnectionRequest } = require('../models/connectionRequest');
const User = require('../models/user');
const mongoose = require('mongoose');

const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

userRouter.get('/user/requests/received', userAuth, async (req, res) => {
    try {

        const loggedInUser = req.user;
        const status = req.params;

        const connctionRequest = await ConnectionRequest.find({
            toUserId : loggedInUser._id,
            status : "interested"
        }).populate("fromUserId", USER_SAFE_DATA);
       // }).populate("fromUserId", ["firstName", "lastName"]);

        res.status(200).json({
            message : "data Fetched Successfully",
            data : connctionRequest,
        })

    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
});

userRouter.get('/user/connections', userAuth, async (req, res) => {
    try {

        const loggedInUser = req.user;

        const connections = await ConnectionRequest.find({
            $or: [
                { toUserId: loggedInUser._id, status: "accepted" },
                { fromUserId: loggedInUser._id, status: "accepted" }
            ]
        })
        .populate("fromUserId", USER_SAFE_DATA)
        .populate("toUserId", USER_SAFE_DATA);

        const connectedUsers = connections.map((row) => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            }
            return row.fromUserId;
        });

        res.status(200).json({
            message: "Connections fetched successfully",
            data: connectedUsers,
        });

    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
});

userRouter.get('/feed', userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit>50 ? 50 : limit;
        const skip = (page-1) * limit;
        
        const connctionRequest = await ConnectionRequest.find({
            $or : [
                {fromUserId : loggedInUser._id },
                {toUserId : loggedInUser._id }
            ],
        }).select("fromUserId toUserId");

        const hideUsersFromFeed = new Set();
        connctionRequest.forEach (req => {
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        });

        const users = await User.find({
            $and : [
                {_id : {$nin : Array.from(hideUsersFromFeed)}},
                {_id : {$ne : loggedInUser._id}},
            ],
        }).select(USER_SAFE_DATA).skip(skip).limit(limit);

          res.json({ message : "These are users send connection",  data : users });


    } catch (err) {
        res.status(400).send("Error " + err.message);
    }
});



module.exports = userRouter;