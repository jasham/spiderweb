const mongoose = require('mongoose')

const items = mongoose.Schema({
    name : {type : String},
    description : {type : String},
    status : {type : String},
    brand_id : { type : Number},
    price : { type : Number},
    unit : { type : Number},
    image_id : { type : String}
});

module.exports = mongoose.model('Items',items)