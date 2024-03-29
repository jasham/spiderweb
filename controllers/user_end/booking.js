const booking = require('../../services/booking')
const router = require('express').Router()

// no use of this fuction need to delete
const add = (req, res) => {
    try {
        booking.save(req.body).then(status => {
            if (status.status)
                return res.status(200).send({ result: 'success' })
            else
                return res.status(200).send({ result: 'fail', error: status.error })
        })
    } catch (error) {
        return res.send({ result: 'fail', error: error.toString(), data: null })
    }
}


router.post('/', add)

module.exports = router
