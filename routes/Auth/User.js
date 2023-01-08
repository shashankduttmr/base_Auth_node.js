const express = require('express')
const Router = express.Router()
const controllers = require('../../controllers/auth/auth')
const middleware = require('../../middlewares/isloggedin')

Router.get('/register', middleware.logger, controllers.register)
Router.post('/register', middleware.logger, controllers.NewUser)
Router.get('/login', middleware.logger, controllers.login)
Router.post('/login', middleware.logger, controllers.UserLogin)
Router.get('/logout', middleware.isLoggedin, controllers.logout)


module.exports = Router