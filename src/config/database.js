const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(
    "mongodb+srv://ambadasgote7_db_user:Ag%40989096@cluster0.chkbjpk.mongodb.net/devTinder"
    );
};


module.exports = connectDB;