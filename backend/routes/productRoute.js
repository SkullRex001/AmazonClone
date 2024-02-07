const express = require("express");
const { getAllProducts, createProduct, updateProducts, deleteProduct, getProductDetails } = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const { createProductReview } = require("../controllers/userController");
const router = express.Router();

router.route("/product").get(
    getAllProducts)

router.route("/product/new").post(isAuthenticatedUser, authorizeRoles("admin")
    , createProduct)

router.route("/product/:id").put(
    isAuthenticatedUser, authorizeRoles("admin"), updateProducts).delete(isAuthenticatedUser, authorizeRoles("admin")
        , deleteProduct).get(getProductDetails)

router.route("/review").put(isAuthenticatedUser , createProductReview)



module.exports = router
