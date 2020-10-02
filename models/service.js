const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Service = new mongoose.Schema({
    category_id : {type:Schema.Types.ObjectId},
    sub_category_id : {type:Schema.Types.ObjectId},
    service : {type : String},
    amount : { type : Number},
    description : {type : String},
    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
    rct: { type: Date, default: new Date() },
    rut: { type: Date, default:null }
})

module.exports = mongoose.model('Service',Service,'Service')