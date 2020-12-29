const { Router } = require('express')
var router = Router()
const bookingService = require('../services/booking')


add = (req, res) => {
    var result = 'fail'
    bookingService.save(req.body).then(user => {     
    }).catch(err => {
        res.send({ result, error: err.toString(), data: null })
    })
}



router.post('/', userLogin)

module.exports = router;
