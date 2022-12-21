const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const authRoutes = require("./routes/auth")
const userRouter = require("./routes/userRoutes")
const categoryRouter = require("./routes/categoryRouter")
const productRoutes = require("./routes/productsRouter")

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
app.use('/api', authRoutes);
app.use('/api', userRouter);
app.use('/api', categoryRouter);
app.use('/api', productRoutes);




const port = process.env.PORT 

app.listen(port, () => {
console.log(`Server is running on port ${port}`)
})

