const joi = require('joi')
const AppError = require('../err')


const PostSchema = joi.object({
    name:joi.string().required(),
    description:joi.string().required(),
    location:joi.string().required(),
    deleteImaged:joi.array()
}).required()

module.exports.PostValidation = function(req, res, next){

}