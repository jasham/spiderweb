const mongoose = require('mongoose')

const Vendor = mongoose.Schema({
    name : {type : String},
    status : {type : String},
    active : {type : Boolean},
    user_id : {type:Schema.Types.ObjectId},
})

module.exports = mongoose.model('Vendor', Vendor, 'Vendor')