const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middleware/catchAsyncError")
const User = require('../models/userModel')

//Register user
exports.reginterUser = catchAsyncError(async (req , res , next)=>{
    const {name , email , password} = req.body;

    const user = await User.create({
        name , email , password , avatar : {
            public_id : "sample",
            url : "sample"
        }
    })
    
    const token = user.getJWTToken()

    res.status(201).json({
        success : true ,
        token
    })
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

    const token = user.getJWTToken()

    res.status(200).json({
        success : true ,
        token
    })




    

})



