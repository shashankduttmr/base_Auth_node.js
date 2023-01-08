const express = require('express')
const Router = express.Router()
const controllers = require('../../controllers/posts/index')
const middleware = require('../../middlewares/isloggedin')

Router.get('/', controllers.Home)
Router.get('/new', middleware.isLoggedin ,controllers.New)

module.exports = Router