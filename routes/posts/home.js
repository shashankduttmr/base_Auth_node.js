const express = require('express')
const Router = express.Router()
const controllers = require('../../controllers/posts/index')

Router.get('/', controllers.Home)

module.exports = Router