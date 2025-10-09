const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");


app.use(express.json());

app.post("/signup", async (req, res) => {
    // Creating a new instance of User model
    const user = new User(req.body);
    try {
        await user.save();
        res.send("User Added successfully");
    } catch (err) {
        res.status(400).send("Error in adding user");
    }
});

app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;
    try {
        const user = await User.find({emailId : userEmail});
        res.send(user);
    } catch (err) {
        res.status(400).send("Error in fetching user");
    }
});

app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        res.status(400).send("Error in fetching users");
    }
});

// Delete user by ID
app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try {
        const user = await User.findByIdAndDelete({_id : userId});
        res.send(user);
    } catch (err) {
        res.status(400).send("Error in fetching users");
    }
});

// Update user 
app.patch('/user', async (req, res) => {
    const userId = req.body.userId;
    const data = req.body;   
    console.log(data);
    try {
        const user = await User.findByIdAndUpdate({_id : userId}, data, {returnDocument : 'after'});
        console.log(user);
        res.send("User updated successfully");
    } catch (err) {
        res.status(400).send("Error in updating user");
    }
});



connectDB()
    .then(()=> {
        console.log("Connected to database");
        app.listen(7777 , () => {
        console.log("Server is running on port 7777...");
        });
    })
    .catch((err) => {
        console.log("Error connecting to database", err);
    });





