const User = require('../models/User')
const Post = require('../models/Post')
const Comment = require('../models/Comments')

module.exports.PostAuthor = async function(req, res, next){
    const {currentUser} = req.session
    const {id} = req.params
    const usr = await User.findById(currentUser)
    const post = await Post.findById(id)
    if(post.author.equals(usr._id)){
        next()
    }else{
        req.flash('error', 'You are not authorised to do so')
        res.redirect(`/post/${id}`)
    }
}

module.exports.CommentAuthor = async function(req, res, next){
    const {currentUser} = req.session
    const {id, commentId} = req.params
    const usr = await User.findById(currentUser)
    const post = await Post.findById(id)
    const cmt = await Comment.findById(commentId)
    if(post.author.equals(usr._id) || cmt.author.equals(usr._id)){
        next()
    }else{
        req.flash('error', 'You are not authorised to do so')
        res.redirect(`/post/${id}`)
    }
}