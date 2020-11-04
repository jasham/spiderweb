const mongoose = require('mongoose')

const VendorGroup = mongoose.Schema({
    vendor_id : {type:Schema.Types.ObjectId},
    group_id : {type:Schema.Types.ObjectId},
})

module.exports = mongoose.model('VendorGroup', VendorGroup, 'VendorGroup')