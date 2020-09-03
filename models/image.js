const mongoose = require('mongoose')

const image = new mongoose.Schema({
    image : {type : String},
    service_id : {type : String},
    item_id : {type : String},
    category_id : {type : String},
    sub_category_id : {type : String}
})

module.exports = mongoose.model('Image',image)