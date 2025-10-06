const express = require("express");

const app = express();

app.use("/home",(req, res) => {
    res.send("Hey, Ambadas Here!");
});


app.use("/hello",(req, res) => {
    res.send("Hello Hello server!");
});

app.use("/test",(req, res) => {
    res.send("Hello from server!");
});

app.listen(7777 , () => {
    console.log("Server is running on port 7777...");
});

