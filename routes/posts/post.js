const express = require('express')
const Router = express.Router({mergeParams:true})
const controllers = require('../../controllers/posts/index')

Router.get('/', controllers.show)


module.exports = Router