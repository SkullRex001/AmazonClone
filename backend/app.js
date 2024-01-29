const express = require("express")
const app = express();


app.use("/api/v1" , require('./routes/productRoute'))


module.exports = app