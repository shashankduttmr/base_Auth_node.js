const express = require('express')
const Router = express.Router({mergeParams:true})
const controllers = require('../../controllers/posts/index')
const middleware = require('../../middlewares/isloggedin')
const Authorised = require('../../middlewares/Authorization')
const Validations = require('../../validations/validations')
const multer = require('multer')
const {Storage} = require('../../Cloud/config')
const Upload = multer({storage:Storage})

Router.get('/', controllers.show)
Router.get('/edit', middleware.isLoggedin, Authorised.PostAuthor, controllers.Update)
Router.put('/edit', middleware.isLoggedin, Authorised.PostAuthor, Upload.array('imgs'), Validations.PostValidation, controllers.Change)
Router.delete('/delete', middleware.isLoggedin, Authorised.PostAuthor, controllers.delete)


module.exports = Router