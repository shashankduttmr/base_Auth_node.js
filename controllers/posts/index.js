const AppError = require("../../err")
const Post = require('../../models/Post')
const mapboxtoken = process.env.mapbox
const MapClient = require('@mapbox/mapbox-sdk/services/geocoding')
const client = MapClient({ mapboxtoken })
const User = require('../../models/User')



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
    res.render('posts/new')
}

module.exports.show = async function (req, res, next) {
    try {
        const { id } = req.params
        if (!id) {
            next(new AppError('invalid parameters', 500))
        } else {
            const data = await Post.findById(id)
            if (!data) {
                next(new AppError('Data not found', 404))
            } else {
                res.render('posts/show')
            }
        }
    } catch (error) {
        next(new AppError(error, 500))
    }
}

module.exports.Create = async function (req, res, next) {
    try {
        const { currentUser } = req.session
        if (!currentUser) {
            next(new AppError('failed to add data to user account .', 500))
        } else {
            const user = await User.findById(currentUser)
            if (!user) {
                next(new AppError('failed to add data to user account .', 404))
            } else {
                const post = new Post(req.body)
                if (!post) {
                    next(new AppError('Failed to post data on server', 404))
                } else {
                    const data = await client.forwardGeocode({
                        query: req.body.name + ', ' + req.body.location,
                        limit: 1
                    })
                        .send()
                    post.imgs = req.files.map((e) => ({ url: e.path, filename: e.filename }))
                    post.geomatry = data.body.features[x].geometry
                    post.author = user
                    user.posts.push(post)
                    await post.save()
                    await user.save()
                    req.flash('success', 'You have made a Post')
                    res.redirect(`/post/${yelp._id}`)
                }
            }
        }
    } catch (error) {
        console.log(error);
        next(new AppError('something went wrong', 500))
    }
}