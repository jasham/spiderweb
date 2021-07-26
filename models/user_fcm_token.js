const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserFCMToken = mongoose.Schema({
    user_id: {type:Schema.Types.ObjectId},
    device_token: { type: Array, default:[] },
    active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false }
},{timestamps:true})

module.exports = mongoose.model('User_FCM_Token', UserFCMToken, 'UserFCMToken')