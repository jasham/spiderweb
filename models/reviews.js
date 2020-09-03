const mongoose = require('mongoose')

const reviews = mongoose.Schema({
    user_id : {type : Number},
    title : {type : String},
    comment : {type : String},
    star : {type : Number},
    ratings : {type : String},  
    service_id: {type : String},  
    vendor_id: {type : String}
})

exports.modules = mongoose.model('Reviews',reviews)