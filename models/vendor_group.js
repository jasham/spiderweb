const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VendorGroup = mongoose.Schema({
    vendor_id : {type:Schema.Types.ObjectId},
    group_id : {type:Schema.Types.ObjectId},
    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
    rct: { type: Date, default: new Date() },
    rut: { type: Date, default:null }
})

module.exports = mongoose.model('VendorGroup', VendorGroup, 'VendorGroup')