const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VendorFCMToken = mongoose.Schema({
    vendor_id: {type:Schema.Types.ObjectId},
    device_token: { type: Array, default:[] },
    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false }
},{timestamps:true})

module.exports = mongoose.model('Vendor_FCM_Token', VendorFCMToken, 'VendorFCMToken')