const mongoose = require('mongoose')

const user = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        min : 6,
        max : 255
    },
    dob : {type : Date},
    sex : {type : String},
    mobile : {type : String},
    email : {
        type : String,
        required : true,
        max : 255,
        min : 6
    },
    date : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('User',user)