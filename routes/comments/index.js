const express = require('express')
const Router = express.Router({mergeParams:true})
const middleware = require('../../middlewares/isloggedin')
const controllers = require('../../controllers/comments/index')

Router.post('/', middleware.isLoggedin)


module.exports = Router