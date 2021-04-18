const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new mongoose.Schema({
    name: {type: String,default:null},
    dob: { type: Date,default:null },
    gender: { type: String,default:null },
    role_id: { type: Number },
    image_url: {type: String,default:null},
    //image_name: {type: String,default:null},
    credential_id : {type: Schema.Types.ObjectId}
})

module.exports = mongoose.model('User', User,'User')