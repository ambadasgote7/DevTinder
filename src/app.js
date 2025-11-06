const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const http = require('http');

require('dotenv').config();
require('./utils/cronjob');

app.use(cors({
    origin : "http://localhost:5173",
    credentials : true,
}));
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require('./routes/user');
const initializeSocket = require("./utils/socket");
const chatRouter = require("./routes/chat");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use('/', userRouter)
app.use("/",chatRouter);

const server = http.createServer(app);
initializeSocket(server);

connectDB()
    .then(()=> {
        console.log("Connected to database");
        server.listen(process.env.PORT , () => {
        console.log("Server is running on port" + `${process.env.PORT}`  +"..... ");
        });
    })
    .catch((err) => {
        console.log("Error connecting to database", err);
    });





