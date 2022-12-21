const Category = require("../model/category")
const {errorHandler} = require("../helpers/dbErrorHandle")

exports.create = (req, res ) => {
    const category = new Category(req.body)
    category.save((err, cat) =>{
        if(err){
            return res.status(400).json({
                error: errorHandler(err) 
            })
        }
        res.json({
            cat
        })
    })
}

exports.categoryById = (req, res, next, id)=>{
    Category.findById(id).exec((err, result)=>{
            if(err || !result){
                return res.status(400).json({
                    error: "Category does not exist"
                })
            }
            req.category = result
            next();
    })
}

exports.read = (req, res)=>{
    return res.json(req.category)
}

exports.readAll = (req,res)=>{
    Category.find().exec((err, result) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(result)
    })
}

exports.update = (req, res) => {
    const category = req.category
    category.name = req.body.name
    category.save((err, cat) => {
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json(cat)
    })
}

exports.remove = (req, res)=>{
    const category = req.category
    category.remove((err, result)=>{
        if(err){
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.json({
            message: "Category deleted"
        })
    })
}