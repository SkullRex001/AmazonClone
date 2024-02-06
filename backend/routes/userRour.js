const express = require('express')
const { reginterUser, loginUser, logout, forgotPassword } = require('../controllers/userController')
const router = express()

router.route("/register").post(reginterUser)
router.route("/login").post(loginUser)
router.route("/logout").get(logout)
router.route("/password/forgot").post(forgotPassword)

module.exports = router;