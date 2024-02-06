const express = require('express')
const { reginterUser, loginUser } = require('../controllers/userController')
const router = express()

router.route("/register").post(reginterUser)
router.route("/login").post(loginUser)

module.exports = router;