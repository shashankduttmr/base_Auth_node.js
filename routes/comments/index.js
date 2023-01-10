const express = require('express')
const Router = express.Router({mergeParams:true})
const middleware = require('../../middlewares/isloggedin')
const controllers = require('../../controllers/comments/index')
const Authorization = require('../../middlewares/Authorization')

Router.post('/', middleware.isLoggedin, controllers.PostComment)
Router.delete('/:comment_id/delete', middleware.isLoggedin, Authorization.CommentAuthor, controllers.delete)


module.exports = Router