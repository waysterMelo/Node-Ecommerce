const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const userRoutes = require("./routes/auth")

require("dotenv").config()

const app = express();

//db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(console.log("DB connected")); 

//middlewares
app.use(bodyParser.json())
app.use(morgan("dev"))
app.use(cookieParser())
app.use(cookieParser())

// routes middleware
app.use('/api', userRoutes);



const port = process.env.PORT || 8000

app.listen(port, () => {
console.log(`Server is running on port ${port}`)
})

