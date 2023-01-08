const express = require('express')
const Router = express()
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('docs/info.yaml')

Router.use('/', swaggerUi.serve)
Router.get('/', swaggerUi.setup(swaggerDocument))

module.exports = Router


