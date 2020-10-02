const mongoose = require('mongoose')

const role = mongoose.Schema({
    role : {type : String},
    role_id : {type : Number}
})

module.exports = mongoose.model('Role',role)