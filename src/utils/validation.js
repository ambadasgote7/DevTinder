const validator = require('validator');

const validateSignUpData = (req) => {
    const {firstName,lastName,emailId,password} = req.body;

    if (!firstName || !lastName) {
        throw new Error("Enter the valid name");
    } else if (!validator.isEmail(emailId)) {
        throw new Error("Email is not valid");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Enter strong password");
    }
}

 const validateEditProfileData = (req) => {
            const allowedEditFields = [
                "firstName", 
                "lastName", 
                "age", 
                "gender", 
                "photoUrl", 
                "about", 
                "skills"
            ];

            const isEditAllowed = Object.keys(req.body).every(key => allowedEditFields.includes(key));
            return isEditAllowed;
 }

module.exports = {
    validateSignUpData, validateEditProfileData
}