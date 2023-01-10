const AppError = require("../../err")
const Post = require('../../models/Post')
const mapboxtoken = process.env.mapbox
const MapClient = require('@mapbox/mapbox-sdk/services/geocoding')
const client = MapClient({ accessToken:mapboxtoken })
const User = require('../../models/User')
const cloudinary = require('cloudinary').v2



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
                    res.redirect(`/posts/${post._id}`)
                }
            }
        }
    } catch (error) {
        console.log(error);
        next(new AppError('something went wrong', 500))
    }
}

module.exports.delete = async function(req, res, next){
    try {
        const {currentUser} = req.session
        const {id} = req.params
        if(!currentUser){
            next(new AppError('failed to delete data.', 500))
        }else{
            const user = await User.findById(currentUser)
            if(!user){
                next(new AppError('failed to add data to user account .', 404))
            }else{
                const post = await Post.findById(id)
                if(!post){
                    next(new AppError('failed delete post .', 404))
                }else{
                    if(post.imgs.length){
                        for(let x = 0; x < post.imgs.length; x++){
                            await cloudinary.uploader.destroy(post.imgs[x].filename)
                        }
                    }
                    await User.findByIdAndUpdate(currentUser, {$pull:{posts:id}})
                    await Post.findByIdAndDelete(id)
                    req.flash('success', 'You have deleted a post')
                    res.redirect('/posts')
                }
            }
        }
    } catch (error) {
        next(new AppError('Something went wrong', 500))       
    }
}

module.exports.Update = async function(req, res, next){
    try {
        const {id} = req.params
        if(!id){
            next(new AppError('Failed to Update', 500))
        }else{
            const data = await Post.findById(id)
            if(!data){
                next(new AppError('Failed to upload', 404))
            }else{
                res.render('posts/edit', {data})
            }
        }
    } catch (error) {
        next(new AppError(error, 500))
    }
}

module.exports.Change = async function(req, res, next){
    try {
        const {id} = req.params
        if(!id){
            next(new AppError('failed to update', 500))
        }else{
            const post = await Post.findById(id)
            if(!post){
                next(new AppError('Failed to upload', 404))
            }else{
                if(req.body.deleteImages){
                    for(let x = 0; x < req.body.deleteImages.length; x++){
                        await cloudinary.uploader.destroy(req.body.deleteImages[x])
                    }
                }
                if(req.files.length){
                    const images = await req.files.map((e)=>({url:e.path, filename:e.filename}))
                    post.imgs.push(...images)
                }
                await Post.findByIdAndUpdate(id, req.body, {runValidators:true})
                req.flash('success', 'you have updated a post')
                res.redirect(`/posts/${id}`)
            }
        }
    } catch (error) {
        next(new AppError(error, 500))
    }
}