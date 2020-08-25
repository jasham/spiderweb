const mongoose = require('mongoose')

const userDetails = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        min : 6,
        max : 255
    },
    dob : {type : Date},
    gender : {type : String},
    mobile : {
        type : String,
        required: true,
        index:{
            unique:true,
        }

    },
    email : {
        type : String,
        required: true,
        index:{
            unique:true,
        },
        match: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    date : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('User', userDetails)