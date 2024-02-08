const Product = require('../models/productModel')

async function updateStock (id , quantity) {
    console.log(id)
    const product = await Product.findById(id);
    console.log(product)
    product.Stock = product.Stock - quantity
    
    await product.save({validateBeforeSave : false})
}

module.exports = updateStock;