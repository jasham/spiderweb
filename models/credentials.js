const mongoose = require('mongoose')

const credentails = new mongoose.Schema({
    user_id : {
        type : Number
    },
    password : {
        type : String
    },
    modified : {
        type : Date
    },
    created : {
        type : Date
    }
})

module.exports = mongoose.model('credentails',credentails)