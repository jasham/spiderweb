const mongoose = require('mongoose')

const credentails = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    email:{
        type : String
    },
    password : {
        type : String
    },
    modified : {
        type : Date,
        default: Date.now
    },
    created : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('credentails',credentails)