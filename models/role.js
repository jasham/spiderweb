const mongoose = require('mongoose')

const role = mongoose.Schema({
    role_type : {
        type : String
    }
})

module.exports = mongoose.model('Role',role)