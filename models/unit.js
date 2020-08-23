const mongoose = require('mongoose')

const unit = mongoose.Schema({
    unit_name : {
        type : String
    }
})

module.exports = mongoose.model('Unit',unit)