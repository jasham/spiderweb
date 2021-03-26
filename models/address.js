const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Address = new mongoose.Schema({
    user_id : {type:Schema.Types.ObjectId},
    address1 : {type : String},
    address2 : {type : String},
    pincode : {type : Number},
    city : {type : String},
    state : {type : String},
    country : {type : String},
    latitude : {type : String},
    longitude : {type : String}
},{timestamps:true})

module.exports = mongoose.model('Addresses',Address,'Address')