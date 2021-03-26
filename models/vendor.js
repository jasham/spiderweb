const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Vendor = mongoose.Schema({
    status : {type : String},
    active : {type : Boolean, default:true},
    user_id : {type:Schema.Types.ObjectId}
},{timestamps:true})

module.exports = mongoose.model('Vendor', Vendor, 'Vendor')