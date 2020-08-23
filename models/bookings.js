const mongoose = require('mongoose')
const { modules } = require('./service')

const bookings = mongoose.Schema({
    user_id : {type : Number},
    service_id : {type : String},
    service_date : {type : Date},
    service_time : {type : Date},
    description : {type : String},
    status : {type : String},
    amount : {type : Number}
})

module.exports = mongoose.model('Booking',bookings)