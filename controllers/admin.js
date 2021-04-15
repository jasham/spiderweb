const admin = require('../services/admin')
const router = require('express').Router()
const { validate } = require('../helper/model_validator')


const approve_vendor_group = (req, res) => {
    try {
        admin.update(req.body).then(update_res => {
            if (update_res.status === 'exist')
                return res.status(200).send({ result: 'subCategoryExist' })
            else if (update_res.status)
                return res.status(200).send({ result: 'success' })
            else
                return res.status(200).send({ result: 'fail', error: update_res.error })
        })
    } catch (error) {
        return res.send({ result: 'fail', error: error.toString() })
    }
}





router.put('/', approve_vendor_group)
