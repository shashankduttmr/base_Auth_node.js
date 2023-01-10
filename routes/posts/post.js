const express = require('express')
const Router = express.Router({mergeParams:true})
const controllers = require('../../controllers/posts/index')
const middleware = require('../../middlewares/isloggedin')
const Authorised = require('../../middlewares/Authorization')


Router.get('/', controllers.show)
Router.delete('/delete', middleware.isLoggedin, Authorised.PostAuthor, controllers.delete)


module.exports = Router