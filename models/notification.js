const mongoose = require('mongoose')
const Schema = mongoose.Schema


const Notification = mongoose.Schema({
    notification_receiver_id: { type: Schema.Types.ObjectId },// it will work for both vendor_id & user_id 
    // user_id: { type: Schema.Types.ObjectId, default: null },
    // vendor_id: { type: Schema.Types.ObjectId, default: null },
    booking_id: { type: Schema.Types.ObjectId, default: null },
    notification_detail: { type: Object },
    is_seen: { type: Boolean, default: false },
    seen_on: { type: Date, default: null },
}, { timestamps: true })

module.exports = mongoose.model('notification', Notification, 'Notification')