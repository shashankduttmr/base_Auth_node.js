const joi = require('joi')
const AppError = require('../err')


const PostSchema = joi.object({
    name:joi.string().required(),
    description:joi.string().required(),
    location:joi.string().required(),
    deleteImages:joi.array()
}).required()

module.exports.PostValidation = function(req, res, next){
    const data = PostSchema.validate(req.body)
    if(data.error){
        next(new AppError(data.error.message, 500))
    }else{
        next()
    }
}