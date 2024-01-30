 const Product = require('../models/productModel') 


//only admin can create 
 exports.createProduct = async (req , res , next)=>{

    try{
        const product = await Product.create(req. body)

        res.status(201).json({
            success : true , 
            product
        })
    }

    catch(err) {
        res.send("Product cannot be created right now")
        console.log(err)
    }
 
 }
 
 
 
 
 //get all product
 exports.getAllProducts = async (req , res)=>{

    try{

        const product =  await Product.find();

        res.status(200).json({
         success : true , 
         product
        })

    }

    catch(err) {
        res.send("cannot get products no")
    }
 
    
  }


  //update product, adminOnly

  exports.updateProducts = async (req , res , next)=>{

    try{
        let product = await Product.findById(req.params.id)

    if(!product) {
        return res.status(500).json({
            success : false , 
            message : "Product not found"
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id , req.body , {
        new : true , 
        runValidators: true , 
        useFindAndModify : false
    })

    res.status(200).json({
        success : true ,
        product
    })

    }

    catch(err) {
        res.send("cannot update product")
        console.log(err)

    }
    



  }



  //delete product

  exports.deleteProduct = async(req , res, next)=>{

    try{
        const product = await Product.findById(req.params.id);

        if(!product) {
            return res.status(500).json({
                success : false ,
                message : "Product not found"
            })
        }
    
        else {
            await Product.findByIdAndDelete(req.params.id)
    
            res.status(200).json({
                success : true,
                message : "Product Delete Success"
            })
    
        }

    }

    catch(err) {
        res.send("cannot delete product right now")
        console.log(err)
    }


  }


  //get single product

  exports.getProductDetails = async (req , res , next)=> {

    try{
        const product = await Product.findById(req.params.id);

        if(!product) {
            return res.status(500).json({
                success : false ,
                message : "Product not found"
            })
        }
    
        else {
            res.status(200).json({
                success : true,
                product
                
            })
    
        }

    }

    catch(err) {
        res.send("cannot get product right now")
        console.log(err)
    }


  } 

