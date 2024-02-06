const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')


exports.isAuthenticatedUser = catchAsyncError(async(req , res, next)=>{
    const {token} = req.cookies;  //provided by cookie-parser, not express



    if(!token) {
        return next(new ErrorHandler("Please Login to access this resource" , 401));
    }

    const decodedData = jwt.verify(token , process.env.JWT_SECREAT) //if failed , it will throw error , which will be handled by error handler

    req.user = await User.findById(decodedData.id);
    next()
})