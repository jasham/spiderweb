const router = require('express').Router()
const notificationService = require('../services/notification')

const add = (req, res) => {
    var result = 'fail'
    try {
        notificationService.save(req.body).then(notificationRes => {
            if (notificationRes.status) {
                result = 'success'
                return res.status(200).send({ result, data: addressRes.saveRes })
            }
            else {
                res.send({ result, error: notificationRes.error, data: null })
            }
        })
    } catch (err) {
        res.send({ result, error: err.toString(), data: null })
    }
}

router.post('/', add)