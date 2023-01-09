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


exports.remove = (req, res) =>{
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


/**
 * sell / arrival
 * by sell = /products?sortBy=sold&order=desc&limit=4
 * by arrival = /products?sortBy=createdAt&order=desc&limit=4
 * if no params are sent, then all products are returned
 */

exports.list = (req, res) =>{
    let order  = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy: '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Product.find().select("-photo").populate("category").sort([[sortBy, order]]).limit(limit).exec((err, result) => {
        if(err){
            return res.status(400).json({
                error: "Product not found"
            });
        }
        res.send(result);
    })
}

exports.readAll = (req, res) =>{
    Product.find((err, result) => {
        if(err){
            return res.status(400).json({
                message: "Products not found"
            })
        }
        res.json(result)
    })
}

exports.listRelated = (req, res)=>{
    let limit = req.query.limit ? parseInt(req.query.limit): 6;

    Product.find({ _id: {$ne: req.product }, category: req.product.category })
    .limit(limit)
    .populate("category", "_id name")
    .exec((err, rs) => {
        if(err){
            return res.status(400).json({
                error: "Products not found"
            });
        }
        res.json(rs);
    })
}

exports.listCategories = (req, res) => {
    Product.distinct('category', {}, (err, categories) => {
        if (err) {
            return res.status(400).json({
                error: 'Categories not found'
               
            });
        }
        res.json(categories);
    });
};

exports.listBySearch = (req, res)=>{
    let order  = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy: '_id';
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    let skip = parseInt(req.body.skip);
    let findArgs = {}

    for ( let key in req.body.filters){
      if(req.body.filters[key] > 0){
        if(key === "price"){
            findArgs[key] = {
                $gte: req.body.filters[0], 
                $lte: req.body.files[1]
            };

        }else{
            findArgs[key] = req.body.filters[key]
        }
      }
    }

    Product.find().select("-photo").populate("category").sort([[sortBy, order]]).skip(skip)
    .limit(limit)
    .exec((err, rs) => {
        if(err){
            return res.status(400).json({
                error: "Product not found"
            })
        }
        res.json({
            size: rs.length, 
            rs
        });
    });

}

exports.photo = (req, res, next)=>{
    if(req.product.photo.data){
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data)
    }
    next();
}