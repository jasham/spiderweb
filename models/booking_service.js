const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BookingService = mongoose.Schema({
    user_id: {type:Schema.Types.ObjectId},
    service_id: {type:Schema.Types.ObjectId},
    sub_category_id: {type:Schema.Types.ObjectId},
    booking_id: {type:Schema.Types.ObjectId}

    //category_id: { type : String },
    //user_s_id : { type : String },
    //vendor_s_id : { type : String }
})

module.exports = mongoose.model('Booking_Service', BookingService,'BookingService')