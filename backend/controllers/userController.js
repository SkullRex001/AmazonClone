const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middleware/catchAsyncError")
const User = require('../models/userModel');
const sendToken = require("../utils/jwtToken");

//Register user
exports.reginterUser = catchAsyncError(async (req , res , next)=>{
    const {name , email , password} = req.body;

    const user = await User.create({
        name , email , password , avatar : {
            public_id : "sample",
            url : "sample"
        }
    })
    
    sendToken(user , 201 , res);
})


exports.loginUser = catchAsyncError(async (req , res, next)=>{
    const {email , password} = req.body;


    if(!email || !password) {
        return next(new ErrorHandler("Please Enter Email & Password" , 400));
    }

    const user = await User.findOne({email}).select("+password") //as we have given select: false in password

    if(!user) {
        return next(new ErrorHandler("Invalid email or password" , 401))
    }

    const isPasswordMatched = await user.comparePassword(password);
 

    if(!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password" ,401))
    }

    sendToken(user , 200 , res);

 
})

exports.logout = catchAsyncError(async (req , res , next)=>{
    res.clearCookie("token", {
        httpOnly: true
    }); //clearCookie is provided by express.

    // res.cookie("token" , null , {
    //     expires : new Date(Date.now()),
    //     httpOnly : true
    // })  This can also be used


    res.status(200).json({
        success: true, 
        message: "Logged Out"
    });
})



