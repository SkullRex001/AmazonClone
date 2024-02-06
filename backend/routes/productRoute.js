const express = require("express");
const { getAllProducts, createProduct, updateProducts, deleteProduct, getProductDetails } = require("../controllers/productController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route("/product").get( getAllProducts)
router.route("/product/new").post(isAuthenticatedUser,createProduct)
router.route("/product/:id").put(isAuthenticatedUser,updateProducts).delete(isAuthenticatedUser,deleteProduct).get(getProductDetails)





module.exports = router
