const express = require("express");

const app = express();

// THis will match all HTTP methods (GET, POST, PUT, DELETE, etc.) to /user
app.use("/user", (req, res) => {
    res.send("Heellooooooooooo");
});

//  This will only handle GET call to /user
app.get("/user", (req, res) => {
    res.send({firstName :  "Ambadas" , lastName : "Gote"});
});

// This will only handle POST call to /user
app.post("/user",(req, res) => {
    res.send("Post request called");
});

// This will only handle DELETE call to /user
app.delete("/user",(req, res) => {
    res.send("Delete request called");
});

// this will match all HTTP methods (GET, POST, PUT, DELETE, etc.) to /test
app.use("/test",(req, res) => {
    res.send("Hello from server!");
});


app.listen(7777 , () => {
    console.log("Server is running on port 7777...");
});

