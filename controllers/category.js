const category = require('../services/category')
const router = require('express').Router()
const { validate } = require('../helper/model_validator')
const { categoryValidationRules } = require('../helper/model_validator/category_validator')
const { list_specific_category, delete_specific_category } = require('../services/category')
const { patch_specific_services } = require('../services/services')

const add = (req,res) => {
    category.save_category(req.body).then(save_res => {
        if (save_res){
            return res.status(200).send({result : "success", data : save_res})
        }else{
            return res.send({result : "unsuccess", data : save_res})
        }
    })
}

const list_all_category = (req,res) => {
    let result_data 
    category.list_all_category().then(save_res => {
        if (save_res)
            result_data =  res.status(200).send(save_res)
        else{
            result = 'fail'
            res.send()
        }
    })
    // req.app.io.emit("notify_me","hello")
    // global.io.sockets.in(global.users[1].userId).emit('notify_me', "I am from user 1");
}

const get_specific_category = (req,res) => {
    
    category.get_specific_category(req.params.id).then(data => {
        if (data)
            return res.status(200).send(data)
        else{
            result = 'fail'
            res.send()
        }
    })
}

const del_specific_category = (req,res) => {
    category.delete_specific_category(req.params.id).then(data => {
        if (data)
            return res.status(200).send(data)
        else{
            result = 'fail'
            res.send()
        }
    })
}

const patch_specific_category = (req,res) => {
    category.patch_specific_category(req.params.id).then(data => {
        if (data)
            return res.status(200).send(data)
        else{
            result = 'fail'
            res.send()
        }
    })
}


router.post('/',validate(categoryValidationRules), add)
router.get('/', list_all_category)
router.get('/:id',get_specific_category)
router.patch('/:id',del_specific_category)
router.delete('/:id',patch_specific_category)


module.exports = router




