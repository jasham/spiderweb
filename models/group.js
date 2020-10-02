const mongoose = require('mongoose')

const Group = mongoose.Schema({
    group_name: { type: String }
})

module.exports = mongoose.model('Group', Group, 'Group')