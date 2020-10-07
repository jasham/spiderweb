const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new mongoose.Schema({
    name: {type: String},
    dob: { type: Date },
    gender: { type: String },
    role_id: { type: Number }
})

module.exports = mongoose.model('User', User,'User')