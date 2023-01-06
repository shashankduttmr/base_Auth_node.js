const User = require('../../models/User')
const bcrypt = require('bcrypt')
const AppError = require('../../err')

module.exports.register = function(req, res){
    res.render('user/register')
}

module.exports.NewUser = async function(req, res, next){
    try {
        const {name, lasname, email, username, password} = req.body
        const Usr = await User.findOne({username:username})
        if(Usr){
            req.flash('error', 'Username is already taken try again')
            res.redirect('/user/register')
        }else{
            const hash = await bcrypt.hash(password, 15) // function helps to generate hashed passwords returns promise
            const U1 = new User({
                name:name,
                lastname:lasname,
                email:email,
                username:username,
                password:hash
            })
            await U1.save()
        }
    } catch (error) {
        
    }
}