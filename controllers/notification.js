const router = require('express').Router()
const notification = require('../services/notification')

const add = (req, res) => {
    var result = 'fail'
    try {
        notification.save(req.body).then(notificationRes => {
            if (notificationRes.status) {
                result = 'success'
                return res.status(200).send({ result, data: addressRes.saveRes })
            }
            else
                res.send({ result, error: notificationRes.error, data: null })
        })
    } catch (err) {
        res.send({ result, error: err.toString(), data: null })
    }
}

const list = (req, res) => {
    try {
        let obj = eval('(' + req.query.query + ')')
        let jsonStr = JSON.stringify(obj)
        queryParams = JSON.parse(jsonStr)
        notification.list(queryParams).then(list => {
            if (list.status)
                return res.status(200).send({ result: 'success', data: list.record })
            else
                return res.status(200).send({ result: 'fail', data: null, error: list.error })
        })
    } catch (error) {
        return res.send({ result: 'fail', error: error.toString(), data: null })
    }
}

const seen = (req, res) => {
    try {
        notification.seen(req.params.id, req.params.notification_receiver_id).then(seenRes => {
            if (seenRes.status)
                return res.status(200).send({ result: 'success' })
            else
                return res.status(200).send({ result: 'fail', error: seenRes.error })
        })
    } catch (error) {
        return res.send({ result: 'fail', error: error.toString() })
    }
}

const count = (req, res) => {
    try {
        notification.count(req.params.notification_receiver_id).then(countRes => {
            if (countRes.status)
                return res.status(200).send({ result: 'success', total: countRes.total })
            else
                return res.status(200).send({ result: 'fail', error: countRes.error })
        })
    } catch (error) {
        return res.send({ result: 'fail', error: error.toString() })
    }
}


router.post('/', add)
router.get('', list)
router.get('/:id/:notification_receiver_id', seen)
router.get('/:notification_receiver_id', count)


module.exports = router
