const mongoose = require('mongoose')
const { modules } = require('./service')

const bookings = mongoose.Schema({
    user_id : {type : String},
    service_id : {type : String},
    description : {type : String},
    status : {type : String},
    amount : {type : Number},
    isActive: {type : Boolean, "default":true},
    createdAt: { type: Date, "default": Date.now },
    updatedAt: { type: Date, "default": Date.now }
});

module.exports = mongoose.model('Booking',bookings)