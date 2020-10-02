const mongoose = require('mongoose')

const Credential = new mongoose.Schema({
    password: { type: String },
    email: { type: String },
    uid: { type: String },
    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
    rct: { type: Date, default: new Date() },
    rut: { type: Date, default: null },

})

module.exports = mongoose.model('Credential', Credential, 'Credential')