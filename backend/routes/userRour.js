const express = require('express')
const { reginterUser, loginUser, logout, forgotPassword, resetPassword } = require('../controllers/userController')
const router = express()

router.route("/register").post(reginterUser)
router.route("/login").post(loginUser)
router.route("/logout").get(logout)
router.route("/password/forgot").post(forgotPassword)
router.route("/password/reset/:token").put(resetPassword)
module.exports = router;