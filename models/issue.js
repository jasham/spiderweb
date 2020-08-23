const mongoose = require('mongoose')

const issues = mongoose.Schema({
    title : {type : String},
    description : {type : String},
    tags : { type : String}
})

module.exports = mongoose.model('Issue',issues)