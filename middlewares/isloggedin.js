module.exports.isLoggedin = function(req, res, next){
    if(req.session.currentUser && req.session.username){
        next()
    }else{
        req.flash('error', 'You must be logged in first')
        res.redirect('/user/login')
    }
}

module.exports.logger = function(req, res, next){
    if(req.session.currentUser && req.session.username){
        res.redirect('/')
    }else{
        next()
    }
}