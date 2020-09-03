const mongoose = require('mongoose')

const user = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        min : 6,
        max : 255
    },
    dob : {type : Date},
    gender : {type : String},
    mobile : {type : String},
    email : {
        type : String,
        required : true,
        max : 255,
        min : 6
    },
    date : {
        type : Date,
        default : Date.now()
    },
    role : {type : String},
    cred_id : {type : String}
})

module.exports = mongoose.model('User',user)