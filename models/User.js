const mongoose = require('mongoose')
const {Schema} = mongoose

const UserSchema = new Schema({
    name:{
        type:String,
        required:[true]
    },
    lastname:{
        type:String,
        required:[true]
    },
    email:{
        type:String,
        required:[true]
    },
    username:{
        type:String,
        required:[true]
    },
    password:{
        type:String,
        required:[true]
    },
    posts:[
        {
            type:Schema.Types.ObjectId,
            ref:'Post'
        }
    ]
})

module.exports = mongoose.model('User', UserSchema)