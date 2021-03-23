const mongoose = require('mongoose')

const Credential = new mongoose.Schema({
    password: { type: String,default: null },
    email: { type : String, default: null },
    mobile : {type : String, default: null},
    uid: { type: String },
    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
    rct: { type: Date, default: new Date() },
    rut: { type: Date, default: null }
},{timestamps:true})

module.exports = mongoose.model('Credential', Credential, 'Credential')