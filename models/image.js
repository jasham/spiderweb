const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Image = new mongoose.Schema({
    image_url : {type : String},
    image_name : {type : String},
    type : {type : String},
    service_id : {type:Schema.Types.ObjectId , default:null },
    item_id : {type : String , default:null},
    category_id : {type:Schema.Types.ObjectId},
    sub_category_id : {type:Schema.Types.ObjectId, default:null},
    active: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false }
},{timestamps:true})

module.exports = mongoose.model('Image',Image,'Image')