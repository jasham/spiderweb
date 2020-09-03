const mongoose = require('mongoose')
const { modules } = require('./service')

const bookings = mongoose.Schema({
    booking_date : { type : String},
    scheduled_date : { type : Date },
    scheduled_time : { type : Date},
    address: { type : String },
    description: { type : String },
    status: { type : String },
    amount: { type : Number },
    address_id: { type : String },
})



module.exports = mongoose.model('Booking',bookings)