const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VendorPraposal = new mongoose.Schema({
    booking_id : {type:Schema.Types.ObjectId},
    vendor_id : {type:Schema.Types.ObjectId},
    price : {type : Number},
    description : {type : String}
},{timestamps:true})

module.exports = mongoose.model('Vendor_Praposal',VendorPraposal,'VendorPraposal')