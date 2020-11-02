const multer = require('multer')
const path = require('path')
const router = require('express').Router()
const service = require('../services/service')
const image = require('../services/image')
const { validate } = require('../helper/model_validator')
const { serviceValidationRules } = require('../helper/model_validator/service_mod')

add = (req, res) => {
    try {
        service.save(req.body).then(save_res => {
            if (save_res.status === 'exist')
                return res.status(200).send({ result: 'serviceExist' })
            else if (save_res.status)
                return res.status(200).send({ result: 'success', data: save_res.save_res })
            else
                return res.send({ result: 'fail', error: save_res.error, data: null })
        })
    } catch (error) {
        return res.send({ result: 'fail', error: error.toString(), data: null })
    }
}

list_all = (req, res) => {
    try {
        let obj = eval('(' + req.query.query + ')')
        let jsonStr = JSON.stringify(obj)
        queryParams = JSON.parse(jsonStr)

        service.list(queryParams).then((list) => {
            if (list.status)
                return res.status(200).send({ result: 'success', data: list.record })
            else
                return res.status(200).send({ result: 'fail', data: null, error: list.error })
        })
    } catch (error) {
        return res.send({ result: 'fail', error: error.toString(), data: null })
    }

}

specific_list = (req, res) => {
    // console.log("Here is request specific",req.params.id)
    service.list_specific_services(req.params.id).then((data) => {
        if (data)
            return res.status(200).send(data)
        else {
            result = 'fail'
            res.send()
        }
    })
}

del_specific_service = (req, res) => {
    try {
        service.remove(req.params.id).then((del_res) => {
            if (del_res.status)
                return res.status(200).send({ result: 'success' })
            else
                return res.status(200).send({ result: 'fail', error: del_res.error })
        })
    } catch (error) {
        return res.send({ result: 'fail', error: error.toString() })
    }
}

update_specific_service = (req, res) => {
    try {
        service.update(req.body).then((update_res) => {
            if (update_res.status)
                return res.status(200).send({ result: 'success' })
            else
                return res.status(200).send({ result: 'fail', error: update_res.error })
        })
    } catch (error) {
        return res.send({ result: 'fail', error: error.toString() })
    }
}


router.post('/', add)
router.get('/', list_all)
//router.get('/:id', specific_list)
router.put('/', update_specific_service)
router.delete('/:id', del_specific_service)

module.exports = router

