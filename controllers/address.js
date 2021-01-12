const router = require('express').Router()
const addressService = require('../services/address')

const add = (req, res) => {
    var result = 'fail'
    try {
        addressService.save(req.body).then(addressRes => {
            if (addressRes.status) {
                result = 'success'
                return res.status(200).send({ result, data: addressRes.saveRes })
            }
            else {
                res.send({ result, error: bookingRes.error, data: null })
            }
        })
    } catch (err) {
        res.send({ result, error: err.toString(), data: null })
    }
}

const list_all = (req, res) => {
    try {
        addressService.list(req.params.user_id).then((list) => {
            if (list.status)
                return res.status(200).send({ result: 'success', data: list.list })
            else
                return res.status(200).send({ result: 'fail', data: null, error: list.error })
        })
    } catch (error) {
        return res.send({ result: 'fail', error: error.toString(), data: null })
    }

}

const del_specific_address = (req, res) => {
    try {
        addressService.remove(req.params.id).then((del_res) => {
            if (del_res.status)
                return res.status(200).send({ result: 'success' })
            else
                return res.status(200).send({ result: 'fail', error: del_res.error })
        })
    } catch (error) {
        return res.send({ result: 'fail', error: error.toString() })
    }
}

const update_specific_address = (req, res) => {
    try {
        addressService.update(req.body).then((update_res) => {
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
router.get('/:user_id', list_all)
router.put('/', update_specific_address)
router.delete('/:id', del_specific_address)

module.exports = router
