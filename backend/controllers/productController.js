
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middleware/catchAsyncError')
const ApiFeatures = require('../utils/apifeatures')
const Product = require('../models/productModel')




//only admin can create 
exports.createProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.create(req.body)

    res.status(201).json({
        success: true,
        product
    })

})


//get all product
exports.getAllProducts = catchAsyncError(async (req, res) => {

    const productPerPage = 5;
    const productCount = await Product.countDocuments()


    const apiFeature = new ApiFeatures(Product.find() , req.query).search().filter().pagination(productPerPage)
  

    const product = await apiFeature.query

   

    res.status(200).json({
        success: true,
        product,
        productCount
    })
})


//update product, adminOnly

exports.updateProducts = catchAsyncError(async (req, res, next) => {


    let product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 500))
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        product
    })

}
)


//delete product

exports.deleteProduct = catchAsyncError(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product Not Found", 500))
    }

    else {
        await Product.findByIdAndDelete(req.params.id)

        res.status(200).json({
            success: true,
            message: "Product Delete Success"
        })

    }
    

})


//get single product

exports.getProductDetails = catchAsyncError(async (req, res, next) => {

  
    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(500).json({
            success: false,
            message: "Product not found"
        })
    }

    else{
        res.status(200).json({
            success: true,
            product
        })

    }

})

 



