if(process.env.Node_Env !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const MethodOverride = require('method-override')
const EjsMate = require('ejs-mate')
const mongoose = require('mongoose')
const CookieParser = require('cookie-parser')
const ConnectMongo = require('connect-mongo')
const flash = require('connect-flash')
const ExpressMongoSanitize = require('express-mongo-sanitize')
const Session = require('express-session')
const path = require('path')
const morgan = require('morgan')
const PORT = process.env.PORT || 4500
const app = express()
const HomeRoute = require('./routes/Home')

mongoose.set('strictQuery', true)

mongoose.connect(process.env.dburl)
.then(function(){
    console.log('Connected to DataBase')
})
.catch(function(){
    console.log('Failed to connect');
})

app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, '/assets')))
app.use(MethodOverride('_method'))
app.use(CookieParser('This is a great secret cookie'))
app.use(ExpressMongoSanitize())
app.use(ExpressMongoSanitize({
    replaceWith:'_'
}))
app.use(Session({
    secret:'this is a good secret',
    resave:false,
    saveUninitialized:true,
    name:'processor',
    store:ConnectMongo.create({
        dbName:'processorsession',
        mongoUrl:process.env.dburl
    })
}))
app.use(flash())
app.use(morgan('dev'))
app.engine('ejs', EjsMate)
app.set('view engine', 'ejs')
app.set('/views', path.join(__dirname,'/views'))

app.use(function(req, res, next){
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    res.locals.currentUser = req.session.currentUser
    res.locals.username = req.session.username
    next()
})


app.use('/', HomeRoute)

app.listen(PORT, function(){
    console.log('Server is up');
})