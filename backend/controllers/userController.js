const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middleware/catchAsyncError")
const User = require('../models/userModel');
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");



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

//forgot password

exports.forgotPassword  = catchAsyncError( async(req , res , next)=>{
   
    const email = req.body.email
    const user = await User.findOne({email});
    if(!user) {
        return next(new ErrorHandler("User not found" , 404))

    }
    //Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();
    
    await user.save({validateBeforeSave : false});
   

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`


    const message = `Your password reset url is :- \n\n ${resetPasswordUrl} \n\n if you have not requested for the email , your account might be in danger`;

    try{
         //function to send mail

        
        await sendEmail({
            email : user.email,
            subject : `Ecommerce Website By AVS`,
            message

        })

        console.log(message)


        res.status(200).json({
            success : true,
            message : `Reset Password Email sent to ${user.email}`
        })

    }

    catch(error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordToken = undefined;

        await user.save({ validateBeforeSave : false})

        return next(new ErrorHandler(err.message , 500))
    }

})



 

