const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema


const productSchema = new mongoose.Schema({
    name:{
           type: String,
           trim: true,
           maxlength: 32,
           required: true 
    },
    description:{
        type: String,
        maxlength: 2000,
        required: true 
    },
    price:{
        type: Number,
        trim: true,
        maxlength: 32,
        required: true 
    },
    category:{
        type: ObjectId,
        ref: "Category",
        required: true
    },
    quantity:{
        type:Number
    },
    photo:{
        data:Buffer,
        contentType: String
    },
    shipping: {
        required: false,
        type: Boolean
    },
    sold:{
        type: Number,
        default: 0
    }
}, {timestamps: true});

module.exports = mongoose.model("Product", productSchema);