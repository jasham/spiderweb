const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BookingService = mongoose.Schema({
    service_id: {type:Schema.Types.ObjectId},
    booking_id: {type:Schema.Types.ObjectId}

    //category_id: { type : String },
    //user_s_id : { type : String },
    //vendor_s_id : { type : String }
})

module.exports = mongoose.model('Booking_Service', BookingService,'BookingService')