const mongoose = require('mongoose')

const SubCategory = mongoose.Schema({
    category_id : {type : String},
    sub_category_name : {type : String}
})