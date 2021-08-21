const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SubCategory = mongoose.Schema({
    category_id : {type:Schema.Types.ObjectId},
    group_id : {type:Schema.Types.ObjectId},
    sub_category: {type : String},
    description : {type : String},
    amount : { type : Number },
    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false }
},{timestamps:true})

module.exports = mongoose.model('SubCategory', SubCategory,'SubCategory')