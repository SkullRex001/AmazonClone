const express = require("express")
const app = express();

const errorMiddleware = require('./middleware/error')

app.use(express.json())

app.use("/api/v1" , require('./routes/productRoute'))
app.use("/api/v1" , require('./routes/userRour'))

app.use(errorMiddleware);


module.exports = app