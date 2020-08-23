const mongoose = require('mongoose')

const service = new mongoose.Schema({
    service_name : {type : String},
    image_id : {type: String}
})

module.exports = mongoose.model('Service',service)