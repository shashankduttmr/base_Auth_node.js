const joi = require('joi')
const AppError = require('../err')


const PostSchema = joi.object({
    name:joi.string().required(),
    description:joi.string().required(),
    location:joi.string().required(),
    deleteImages:joi.array()
}).required()

const CommentSchema = joi.object({
    rating:joi.number().min(1).max(5).required(),
    body:joi.string().required()
}).required()

module.exports.PostValidation = function(req, res, next){
    const data = PostSchema.validate(req.body)
    if(data.error){
        next(new AppError(data.error.message, 500))
    }else{
        next()
    }
}

module.exports.CommentValidation = function(req, res, next){
    const data = CommentSchema.validate(req.body)
    if(data.error){
        next(new AppError(data.error.message, 500))
    }else{
        next()
    }
}