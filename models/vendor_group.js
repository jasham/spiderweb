const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VendorGroup = mongoose.Schema({
    vendor_id : {type:Schema.Types.ObjectId},
    group_id : {type:Schema.Types.ObjectId},
    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
    approved: { type: Boolean, default: false }
},{timestamps:true})

module.exports = mongoose.model('VendorGroup', VendorGroup, 'VendorGroup')