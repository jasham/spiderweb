const mongoose = require('mongoose')

const bookingService = mongoose.Schema({
    user_id : { type : String },
    service_id : { type : String },
    service_date : { type : Date },
    service_time: { type : Date },
    category_id: { type : String },
    sub_category_id: { type : String },
    booking_id: { type : String },
    user_s_id : { type : String },
    vendor_s_id : { type : String }
})

module.exports = mongoose.model('Booking_Services',bookingService)