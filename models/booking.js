const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Booking = mongoose.Schema({
    booking_date : { type : Date, default: new Date()},
    scheduled_date : { type : Date },
    scheduled_time : { type : Date},
    description: { type : String },
    status: { type : String },
    address_id: { type : String },
    vendor_id : { type:Schema.Types.ObjectId,default:null},
    user_id: {type:Schema.Types.ObjectId},
})



module.exports = mongoose.model('Booking',Booking,'Booking')