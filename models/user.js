const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new mongoose.Schema({
    name: {type: String},
    dob: { type: Date,default:null },
    gender: { type: String,default:null },
    role_id: { type: Number },
    credential_id : {type: Schema.Types.ObjectId},
})

module.exports = mongoose.model('User', User,'User')