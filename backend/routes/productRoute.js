const express = require("express");
const { getAllProducts, createProduct, updateProducts, deleteProduct, getProductDetails } = require("../controllers/productController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route("/product").get( isAuthenticatedUser,getAllProducts)
router.route("/product/new").post(createProduct)
router.route("/product/:id").put(updateProducts).delete(deleteProduct).get(getProductDetails)





module.exports = router
