const AppError = require('../../err')
const Comment = require('../../models/Comments')
const Post = require('../../models/Post')
const User = require('../../models/User')

module.exports.PostComment = async function (req, res, next) {
    try {
        const { id } = req.params
        const { currentUser } = req.session
        const post = await Post.findById(id)
        const user = await User.findById(currentUser)
        if (!id && !currentUser) {
            req.flash('error', 'Failed to push a comment')
            res.redirect(`/posts/${id}`)
        } else {
            if (!post && !user) {
                req.flash('error', 'Failed to push a comment')
                res.redirect(`/posts/${id}`)
            } else {
                const cmt = new Comment(req.body)
                cmt.author = user
                post.comments.push(cmt)
                await cmt.save()
                await post.save()
                req.flash('success', 'You have posted a comment')
                res.redirect(`/posts/${id}`)
            }
        }
    } catch (error) {
        next(new AppError(error, 500))
    }
}

module.exports.delete = async function (req, res, next) {
    try {
        const { id, comment_id } = req.params
        const { currentUser } = req.session
        const post = await Post.findById(id)
        const user = await User.findById(currentUser)
        if (!id && !currentUser) {
            req.flash('error', 'Failed to push a comment')
            res.redirect(`/posts/${id}`)
        } else {
            if (!post && !user) {
                req.flash('error', 'Failed to push a comment')
                res.redirect(`/posts/${id}`)
            }else{
                await Comment.findByIdAndDelete(comment_id)
                await Post.findByIdAndUpdate(id, {$pull:{comments:comment_id}})
                req.flash('success', 'Your comment has been deleted')
                res.redirect(`/posts/${id}`)
            }
        }

    } catch (error) {
        next(new AppError(error, 500))
    }
}