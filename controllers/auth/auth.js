const User = require('../../models/User')
const bcrypt = require('bcrypt')
const AppError = require('../../err')

module.exports.register = function (req, res) {
    res.render('user/register')
}

module.exports.NewUser = async function (req, res, next) {
    try {
        const { name, lastname, email, username, password } = req.body
        const Usr = await User.findOne({ username: username })
        if (Usr) {
            req.flash('error', 'Username is already taken try again')
            res.redirect('/user/register')
        } else {
            const hash = await bcrypt.hash(password, 15) // function helps to generate hashed passwords returns promise
            const U1 = new User({
                name: name,
                lastname: lastname,
                email: email,
                username: username,
                password: hash
            })
            await U1.save()
            req.session.currentUser = U1._id
            req.session.username = U1.username
            req.flash('success', `Thank you for registering mr ${U1.name} from now onwards your username will be ${U1.username}`)
            res.redirect('/posts')
        }
    } catch (error) {
        console.log(error);
        next(new AppError('Failed to register', 404))
    }
}

module.exports.login = function (req, res) {
    res.render('user/login')
}

module.exports.UserLogin = async function (req, res, next) {
    try {
        const { username, password } = req.body
        const U1 = await User.findOne({ username: username })
        if (!U1) {
            req.flash('error', 'Username not found')
            res.redirect('/user/login')
        } else {
            const verify = await bcrypt.compare(password, U1.password)
            if (!verify) {
                req.flash('error', 'Invalid Username or a Password')
                res.redirect('/user/login')
            } else {
                req.session.currentUser = U1._id
                req.session.username = U1.username
                req.flash('success', 'Welcome Back')
                res.redirect('/posts')
            }
        }
    } catch (error) {
        next(new AppError('Failed to login', 404))
    }
}

module.exports.logout = function(req, res){
    req.session.destroy()
    res.redirect('/posts')
}