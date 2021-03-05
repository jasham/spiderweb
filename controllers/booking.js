const router = require('express').Router()
const bookingService = require('../services/booking')

//#region ---USER SIDE EVENT---
const add = (req, res) => {
    var result = 'fail'
    try {
        bookingService.save(req.body).then(bookingRes => {
            if (bookingRes.status) {
                result = 'success'
                req.app.io.emit("booking",bookingRes.notificationDetails)
                return res.status(200).send({ result })
            }
            else {
                res.send({ result, error: bookingRes.error, data: null })
            }
        })
    } catch (err) {
        res.send({ result, error: err.toString(), data: null })
    }
}

const acceptByUser = (req, res) => {
    var result = 'fail'
    try {
        bookingService.acceptByUser(req.params.user_id,req.params.vendor_id, req.params.booking_id,).then(acceptRes => {
            if (acceptRes.status) {
                result = 'success'
                req.app.io.emit('acceptByUser', acceptRes.detailsAfterAcceptByUser)
                return res.status(200).send({ result })
            }
            else {
                res.send({ result, error: acceptRes.error, data: null })
            }
        })
    } catch (err) {
        res.send({ result, error: err.toString(), data: null })
    }
}

//#endregion

//#region ---VENDOR SIDE EVENT---

const acceptByVendor = (req, res) => {
    var result = 'fail'
    try {
        bookingService.acceptByVendor(req.params.vendor_id, req.params.booking_id,).then(acceptRes => {
            if (acceptRes.status === 'alreadyAccepted') {
                result = 'alreadyAccepted'
                return res.status(200).send({ result })
            }
            else if (acceptRes.status) {
                result = 'success'
                req.app.io.emit('acceptByVendor', acceptRes.detailsAfterAcceptByVendor)
                return res.status(200).send({ result })
            }
            else {
                res.send({ result, error: acceptRes.error, data: null })
            }
        })
    } catch (err) {
        res.send({ result, error: err.toString(), data: null })
    }
}

//#endregion

router.post('/', add)
router.get('/acceptbyvendor', acceptByVendor)
router.get('/acceptbyuser', acceptByUser)

module.exports = router
