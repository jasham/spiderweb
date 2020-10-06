const { Router } = require('express');
var router = Router()
const accountService = require('../services/account')

userLogin = (req, res) => {
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
vendorLogin = (req, res) => {
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

userSignup = (req, res) => {
    let result = 'fail'
    req.body.role_id = 3
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

vendorSignup = (req, res) => {
    let result = 'fail'
    req.body.role_id = 2
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

router.post('/vendorlogin', vendorLogin)
router.post('/userlogin', userLogin)
router.post('/usersignup', userSignup)
router.post('/vendorsignup', vendorSignup)

module.exports = router;
