const express = require("express")
const app = express();

app.use(express.json())

app.use("/api/v1" , require('./routes/productRoute'))


module.exports = app