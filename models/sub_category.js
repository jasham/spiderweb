const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SubCategory = mongoose.Schema({
    category_id : {type:Schema.Types.ObjectId},
    group_id : {type:Schema.Types.ObjectId},
    sub_category: {type : String},
    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
    rct: { type: Date, default: new Date() },
    rut: { type: Date, default:null },
    amount : { type : Number }
})

module.exports = mongoose.model('SubCategory', SubCategory,'SubCategory')