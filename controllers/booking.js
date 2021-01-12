const router = require('express'). Router()
const bookingService = require('../services/booking')

//#region ---USER SIDE EVENT---
const add = (req, res) => {
    var result = 'fail'
    try {
        bookingService.save(req.body).then(bookingRes => {
            if(bookingRes.status){
                result='success'
                req.app.io.emit(req.body.group_id, bookingRes.notificationDetails)
                return res.status(200).send({ result })
            }
            else{
                res.send({ result, error: bookingRes.error , data: null })
            }           
        })      
    } catch (err) {
        res.send({ result, error: err.toString(), data: null })
    }  
}

//#endregion

//#region ---VENDOR SIDE EVENT---

const accept = (req, res) => {
    var result = 'fail'
    try {
        bookingService.accept(req.params.user_id,req.params.vendor_id).then(acceptRes => {
            if(acceptRes.status){
                result='success'
                req.app.io.emit(req.body.group_id, acceptRes.notificationDetails)
                return res.status(200).send({ result })
            }
            else{
                res.send({ result, error: acceptRes.error , data: null })
            }           
        })      
    } catch (err) {
        res.send({ result, error: err.toString(), data: null })
    }  
}

//#endregion

router.post('/', add)
router.post('/', accept)

module.exports = router
