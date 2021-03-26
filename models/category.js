const mongoose = require('mongoose')

const Category = mongoose.Schema({
    category: { type: String },
    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false }
},{timestamps:true})

module.exports = mongoose.model('Category', Category, 'Category')