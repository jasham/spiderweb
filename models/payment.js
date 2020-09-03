const mongoose = require('mongoose')

const payment = mongoose.Schema({
    user_id : { type : String },
    service_id : { type : String},
    recipt_id : { type : String},
    method : { type : String}
})

module.exports = mongoose.model(payment)