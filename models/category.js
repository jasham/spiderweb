const mongoose = require('mongoose')

const Category = mongoose.Schema({
    category: { type: String },
    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
    rct: { type: Date, default: new Date() },
    rut: { type: Date, default: null }
})

module.exports = mongoose.model('Category', Category, 'Category')