const AppError = require("../../err")
const Post = require('../../models/Post')
const mapboxtoken = process.env.mapbox
const MapClient = require('@mapbox/mapbox-sdk/services/geocoding')
const client = MapClient({mapboxtoken})



module.exports.Home = async function (req, res, next) {
    try {
        const data = await Post.find({})
        if (!data) {
            next(new AppError('failed to fetch data', 404))
        } else {
            res.render('posts/index')
        }
    } catch (error) {
        next(new AppError('Server is not Happy', 500))
    }
}

module.exports.New = function (req, res) {
    
}

module.exports.show = async function (req, res, next) {
    try {
        const { id } = req.params
        if (!id) {
            next(new AppError('invalid parameters', 500))
        }else{
            const data = await Post.findById(id)
            if(!data){
                next(new AppError('Data not found', 404))
            }else{
                res.render('posts/show')
            }
        }
    } catch (error) {
        next(new AppError(error, 500))
    }
}