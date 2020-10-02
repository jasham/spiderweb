const { Router } = require('express');
var router = Router()
const accountService = require('../services/account')

login = (req, res) => {
    var result = 'fail'
    accountService.login(req.body).then(user => {
        if (user.status === 'wrongEmail') {
            result = 'wrongEmail'
            res.send({ result: result, data: null })
        }
        else if (user.status === 'wrongMobile') {
            result = 'wrongMobile'
            res.send({ result: result, data: null })
        }
        else if (user.status === 'wrongPassword') {
            result = 'wrongPassword'
            res.send({ result: result, data: null })
        }
        else if (user.status) {
            result = 'success'
            res.send({ result: result, data: user.user })
        }
        else {
            res.send({ result: result, error: user.error, data: null })
        }
    }).catch(err => {
        res.send({ result: result, error: err.toString(), data: null })
    })
}

signup = (req, res) => {
    var result = 'fail'
    accountService.signup(req.body).then(user => {
        if (user.status === 'emailExist') {
            result = 'emailExist'
            res.send({ result: result, data: null })
        }
        else if (user.status === 'mobileExist') {
            result = 'mobileExist'
            res.send({ result: result, data: null })
        }
        else if (user.status) {
            result = 'success'
            res.send({ result: result, data: user.user })
        }
        else {
            res.send({ result: result, error: user.error, data: null })
        }

    }).catch(err => {
        res.send({ result: result, error: err.toString(), data: null })
    })
}

router.post('/login', login)
router.post('/signup', signup)

module.exports = router;
