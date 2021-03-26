const mongoose = require('mongoose')
const Schema = mongoose.Schema


const OTPLog = mongoose.Schema({
    otp: { type: String },
    used: { type: Boolean, default: false },
    credential_id: {type:Schema.Types.ObjectId}
},{timestamps:true})

module.exports = mongoose.model('OtpLog', OTPLog, 'OtpLog')