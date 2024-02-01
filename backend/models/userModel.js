const mongoose = require('mongoose');
const validator = require('validator')


const userSchema = new mongoose.Schema({
    name : {
        type : String,
        require: [true , "Please Enter Your Name"],
        maxLength : [30 , "Name cannot exceed 30 characters"],
        minLength : [4 , "Name should have more than 4 characters"]

    },

    email : {
        type : String,
        required : true,
        unique : true,
        validate : [validator.isEmail , "Please Enter valid Email"]
    },
    password : {
        type : String ,
        require : true ,
        minLength : [8 , "Password should be greater than 8 character"]

    },

    avatar : {
        public_id : {
            type : String
        } , 
        url : {
            type : String ,
            require : true
        }

    },

    role : {
        type : String,
        default : "user"
    },

    resetPasswordToken : String,
    resetPasswordExpire : Date,
})

module.exports = mongoose.model('User' , userSchema);