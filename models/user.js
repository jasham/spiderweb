const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new mongoose.Schema({
    name: {type: String},
    dob: { type: Date },
    gender: { type: String },
    mobile: { type: String },
    role: { type: Number },
    credential_id: { type: Schema.Types.ObjectId }
})

module.exports = mongoose.model('User', User,'User')