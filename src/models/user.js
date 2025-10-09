const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
    },
    lastName : {
        type : String
    },
    emailId : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    password : {
        type : String,
        required : true,
    },
    age : {
        type : Number
    },
    gender : {
        type : String,
        validate(value) {
            if(!["Male", "Female", "Other"].includes(value)) {
                throw new Error("Invalid Gender");
            }
        }
    },
    photoUrl : {
        type : String,
        default : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
    },
    about : {
        type : String,
        default : "Hey there! I am using DevTinder."
    },
    skills : {
        tpee : [String]
    }
}, {timestamps : true});


module.exports = mongoose.model("User", userSchema);
