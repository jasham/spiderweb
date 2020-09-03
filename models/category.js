const mongoose = require('mongoose')

const Category = mongoose.Schema({
    category_name : {type : String}
})

module.exports = mongoose.model('Category',Category)