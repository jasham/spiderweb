const mongoose = require('mongoose')

const Group = mongoose.Schema({
    group_name: { type: String },
    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false }
})

module.exports = mongoose.model('Group', Group, 'Group')