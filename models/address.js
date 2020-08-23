const mongoose = require('mongoose')

const address = new mongoose.Schema({
    user_id : {type : Number},
    address1 : {type : String},
    address2 : {type : String},
    pincode : {type : Number},
    city : {type : String},
    state : {type : String},
    country : {type : String}
})

exports.module = mongoose.model('Address',address)