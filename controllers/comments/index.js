const AppError = require('../../err')
const Comment = require('../../models/Comments')
const Post = require('../../models/Post')
const User = require('../../models/User')

module.exports.PostComment = async function(req, res, next){
    const {id} = req.params
    const {currentUser} = req.session
    
}

