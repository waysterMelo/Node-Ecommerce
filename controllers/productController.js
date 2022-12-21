const Product = require("../model/productModel")
const _ = require("lodash")
const formidable = require("formidable")
const {errorHandler} = require("../helpers/dbErrorHandle")
const fs = require("fs")


exports.create = (req, res) =>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse( req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: "Image could not be uploaded"
            })
        }
        let product = new Product(fields)

        if(files.photo){

            if(files.photo.size > 1000000){
                return res.status(400).json({
                    error: "Image could be less than 1mb"
                });
            }

        //check for all fields
        const { name, description, price, category, quantity, shipping } = fields

        if( !name || !description || !price || !category || !quantity || !shipping){
            return res.status(400).json({
                error: "All fields are required"
            })
        }

            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contenttype = files.photo.type
        }
        product.save((err, prod) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json({
                prod
            })
        });
     })
}

exports.productById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) =>{
        if(err || !product){
            return res.status(400).json({
                error: "Product not found"
            })
        }
        req.product = product
        next();
    })
}

exports.read = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product)
}


exports.remove = (req, res)=>{
let product =  req.product
product.remove((err, prod) =>{
    if(err){
        return res.status(400).json({
            error: errorHandler(err)
        })
    }
    res.json({
        message: "Product deleted successfully"
    })
})
}

exports.update = (req,res) =>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse( req, (err, fields, files) => {
        if(err){
            return res.status(400).json({
                error: "Image could not be uploaded"
            })
        }
        let product = req.product
        product = _.extend(product, fields)

        if(files.photo){

            if(files.photo.size > 1000000){
                return res.status(400).json({
                    error: "Image could be less than 1mb"
                });
            }

        //check for all fields
        const { name, description, price, category, quantity, shipping } = fields

        if( !name || !description || !price || !category || !quantity || !shipping){
            return res.status(400).json({
                error: "All fields are required"
            })
        }

            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contenttype = files.photo.type
        }
        product.save((err, prod) => {
            if(err){
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            res.json({
                prod
            })
        });
     })
}
