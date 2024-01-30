class ErrorHandler extends Error {
    constructor(message , statusCode) {
        super(message);
        this.statusCode = statusCode;

        Error.captureStackTrace(this , this.constructor) //trace the path of error
    }
}

module.exports = ErrorHandler;

