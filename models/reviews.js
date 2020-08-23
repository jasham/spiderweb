const mongoose = require('mongoose')

const reviews = mongoose.Schema({
    user_id : {
        type : Number
    },
    title : {
        type : String
    },
    comment : {
        type : String
    },
    star : {
        type : Number
    }
})

exports.modules = mongoose.model('Reviews',reviews)