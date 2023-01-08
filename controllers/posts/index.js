const AppError = require("../../err")
const Post = require('../../models/Post')


module.exports.Home = async function(req, res, next){
    try {
        const data = await Post.find({})
        if(!data){
            next(new AppError('failed to fetch data', 404))
        }else{
            res.render('posts/index')
        }
    } catch (error) {
        next(new AppError('Server is not Happy', 500))
    }
}

module.exports.New = function(req, res){
    res.send('Add New Post')
}