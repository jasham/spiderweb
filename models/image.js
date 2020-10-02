const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Image = new mongoose.Schema({
    image_url : {type : String},
    service_id : {type:Schema.Types.ObjectId},
    item_id : {type : String , default:null},
    category_id : {type:Schema.Types.ObjectId},
    sub_category_id : {type:Schema.Types.ObjectId},
    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
    rct: { type: Date, default: new Date() },
    rut: { type: Date, default:null }
})

module.exports = mongoose.model('Image',Image,'Image')