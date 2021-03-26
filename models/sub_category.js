const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SubCategory = mongoose.Schema({
    category_id : {type:Schema.Types.ObjectId},
    group_id : {type:Schema.Types.ObjectId},
    sub_category: {type : String},
    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
    amount : { type : Number }
},{timestamps:true})

module.exports = mongoose.model('SubCategory', SubCategory,'SubCategory')