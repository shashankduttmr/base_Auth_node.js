const mongoose = require('mongoose')
const {Schema} = mongoose

const CommentSchema = new Schema({
    rating:{
        min:[1],
        max:[5],
        type:Number
    },
    body:{
        type:String,
        required:[true]
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
})


module.exports = mongoose.model('Comment', CommentSchema)