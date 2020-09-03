const mongoose = require('mongoose')
const router = require('express').Router()
const { validate } = require('../helper/model_validator')
const { serviceValidationRules } = require('../helper/model_validator/service_mod')

const service = new mongoose.Schema({
    service_name : {type : String},
    category_id : {type : String},
    sub_category_id : {type : String},
    amount : { type : Number},
    name : { type : String},
    description : {type : String}
})

module.exports = mongoose.model('Service',service)