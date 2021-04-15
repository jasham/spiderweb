const mongoose = require('mongoose')
const Schema = mongoose.Schema


const Notifications = mongoose.Schema({
    user_id : {type : Schema.Types.ObjectId},
    vendor_id : {type : Schema.Types.ObjectId},
    booking_id : {type : Schema.Types.ObjectId, default: null},
    notification_detail : {type : Object},
    is_seen : {type : Boolean, default: false},
    star : {type : Number},
    seen_on : {type : Date},  
},{timestamps:true})

exports.modules = mongoose.model('notification', Notifications)