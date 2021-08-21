const router = require('express').Router()
const { booking } = require('../helper/db')
const bookingService = require('../services/booking')

//#region ---USER SIDE EVENT---
const add = (req, res) => {
    var result = 'fail'
    try {
        bookingService.save(req.body).then(bookingRes => {
            if (bookingRes.status) {
                result = 'success'
                req.app.io.emit("booking", bookingRes.notificationDetails)
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
        bookingService.acceptByUser(req.params.user_id, req.params.booking_id,).then(acceptRes => {
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
const rejectByUser = (req, res) => {
    var result = 'fail'
    try {
        bookingService.rejectByUser(req.params.user_id, req.params.rejected_vendor_id, req.params.booking_id).then(rejectRes => {
            if (rejectRes.status) {
                result = 'success'
                req.app.io.emit('rejectByUser', rejectRes.detailsAfterRejectByUser)
                return res.status(200).send({ result })
            }
            else {
                res.send({ result, error: rejectRes.error, data: null })
            }
        })
    } catch (err) {
        res.send({ result, error: err.toString(), data: null })
    }
}
const cancelByUser = (req, res) => {
    var result = 'fail'
    try {
        bookingService.cancelByUser(req.params.user_id, req.params.booking_id,).then(cancelRes => {
            if (cancelRes.status) {
                result = 'success'
                if (cancelRes.detailsAfterCancelByUser.vendor_id !== null)
                    req.app.io.emit('cancelByUser', cancelRes.detailsAfterCancelByUser)
                return res.status(200).send({ result })
            }
            else {
                res.send({ result, error: cancelRes.error, data: null })
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

const addVendorPlacedBid = (req, res) => {
    var result = 'fail'
    try {
        bookingService.vendorPlacedBid(req.body).then(placedBidRes => {
            if (placedBidRes.status === 'alreadyBidPlaced') {
                result = 'exist'
                return res.status(200).send({ result })
            }
            else if (placedBidRes.status) {
                result = 'success'
                req.app.io.emit('vendorPlacedBid', placedBidRes.detailsAfterPlacedBid)
                return res.status(200).send({ result })
            }
            else
                res.send({ result, error: acceptRes.error, data: null })
        })
    } catch (err) {
        res.send({ result, error: err.toString(), data: null })
    }
}
//#endregion

//#region ---Common---
const all_booking_by_status_role = (req, res) => {
    try {
        let obj = eval('(' + req.query.query + ')')
        let jsonStr = JSON.stringify(obj)
        queryParams = JSON.parse(jsonStr)
        bookingService.allBookingFor_Vendor_User(queryParams).then(list => {
            if (list.status)
                return res.status(200).send({ result: 'success', data: list.record })
            else
                return res.status(200).send({ result: 'fail', data: null, error: list.error })
        })
    } catch (error) {
        return res.send({ result: 'fail', error: error.toString(), data: null })
    }
}

const praposal_by_bookingid = (req, res) => {
    try {
        let obj = eval('(' + req.query.query + ')')
        let jsonStr = JSON.stringify(obj)
        queryParams = JSON.parse(jsonStr)
        bookingService.praposalFor_Vendor_User(queryParams).then(list => {
            if (list.status)
                return res.status(200).send({ result: 'success', data: list.record })
            else
                return res.status(200).send({ result: 'fail', data: null, error: list.error })
        })
    } catch (error) {
        return res.send({ result: 'fail', error: error.toString(), data: null })
    }
}
//#endregion

//#region ---USER Routing---
router.post('/', add)
router.get('/acceptbyuser/:user_id/:booking_id', acceptByUser)
router.get('/rejectbyuser/:user_id/:rejected_vendor_id/:booking_id', rejectByUser)
router.get('/cancelbyuser/:vendor_id/:booking_id', cancelByUser)
//#endregion

//#region ---VENDOR Routing---
router.get('/acceptbyvendor/:vendor_id/:booking_id', acceptByVendor)
router.post('/vendorplacebid', addVendorPlacedBid)
//#endregion

//#region ---Common---
router.get('/all_booking', all_booking_by_status_role)
router.get('/praposal', praposal_by_bookingid)
//#endregion

module.exports = router
