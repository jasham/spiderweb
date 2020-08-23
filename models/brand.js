const mongoose = require('mongoose')

const brands = new mongoose.Schema({
    name : {
        type : String
    }
})

module.exports = mongoose.model('Brands',brands)