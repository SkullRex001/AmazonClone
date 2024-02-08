async function updateStock (id , quantity) {
    const product = await Product.findById(id);
    product.stock = product.stock - quantity
    await product.save({validateBeforeSave : false})
}

module.exports = updateStock;