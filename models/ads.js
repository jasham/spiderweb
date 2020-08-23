const mongoose = require('mongoose')

const ads = mongoose.Schema({
    title : {type:String},
    description : {type :String},
    image_id : {type : Number}
})

module.exports = mongoose.model('ads',ads)