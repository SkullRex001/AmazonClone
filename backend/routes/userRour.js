const express = require('express')
const { reginterUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails } = require('../controllers/userController')
const { isAuthenticatedUser } = require('../middleware/auth')
const router = express()

router.route("/register").post(reginterUser)
router.route("/login").post(loginUser)
router.route("/logout").get(logout)
router.route("/password/forgot").post(forgotPassword)
router.route("/password/reset/:token").put(resetPassword)
router.route("/me").get(isAuthenticatedUser
     , getUserDetails)
module.exports = router;