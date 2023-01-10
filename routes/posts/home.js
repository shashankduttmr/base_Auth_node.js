const express = require('express')
const Router = express.Router()
const controllers = require('../../controllers/posts/index')
const middleware = require('../../middlewares/isloggedin')
const multer = require('multer')
const {Storage} = require('../../Cloud/config')
const Upload = multer({storage:Storage})

Router.get('/', controllers.Home)
Router.get('/new', middleware.isLoggedin ,controllers.New)
Router.post('/new', middleware.isLoggedin)

module.exports = Router