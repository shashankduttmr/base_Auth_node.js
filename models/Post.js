const mongoose = require('mongoose')
const {Schema} = mongoose

const PostSchema = new Schema({
    imgs:[
        {
            url:String,
            filename:String
        }
    ],
    name:{
        type:String,
        required:[true]
    },
    description:{
        type:String,
        required:[true]
    },
    location:{
        type:String,
        required:[true]
    },
    geomatry:{
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
          coordinates: {
            type: [Number],
            required: true
        }
    },
    comments:[
        {
            type:Schema.Types.ObjectId,
            ref:'comment'
        }
    ],
    author:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
})

module.exports = mongoose.model('Post', PostSchema)