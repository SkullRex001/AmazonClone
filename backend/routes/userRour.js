const express = require('express')
const { reginterUser, loginUser, logout } = require('../controllers/userController')
const router = express()

router.route("/register").post(reginterUser)
router.route("/login").post(loginUser)
router.route("/logout").get(logout)

module.exports = router;