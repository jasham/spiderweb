const { Router } = require('express');
var router = Router()
const accountService = require('../services/account')
const { validate } = require('../helper/model_validator')
const { userSignUpValidator } = require('../helper/model_validator/user_sign_up_validator')
const { userLoginValidator } = require('../helper/model_validator/userLoginValidator')

userLogin = (req, res) => {
    var result = 'fail'
    accountService.login(req.body).then(user => {
        if (user.status === 'wrongEmail') {
            result = 'wrongEmail'
            res.send({ result, data: null })
        }
        else if (user.status === 'wrongMobile') {
            result = 'wrongMobile'
            res.send({ result, data: null })
        }
        else if (user.status === 'wrongPassword') {
            result = 'wrongPassword'
            res.send({ result, data: null })
        }
        else if (user.status) {
            result = 'success'
            res.send({ result, data: user.user })
        }
        else {
            res.send({ result, error: user.error, data: null })
        }
    }).catch(err => {
        res.send({ result, error: err.toString(), data: null })
    })
}

adminLogin = (req, res) => {
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
            res.send({ result, data: null })
        }
        else if (user.status === 'mobileExist') {
            result = 'mobileExist'
            res.send({ result, data: null })
        }
        else if (user.status) {
            result = 'success'
            res.send({ result, data: user.user })
        }
        else {
            res.send({ result, error: user.error, data: null })
        }

    }).catch(err => {
        res.send({ result, error: err.toString(), data: null })
    })
}

vendorSignup = (req, res) => {
    let result = 'fail'
    req.body.role_id = 2
    accountService.signup(req.body).then(user => {
        if (user.status === 'emailExist') {
            result = 'emailExist'
            res.send({ result, data: null })
        }
        else if (user.status === 'mobileExist') {
            result = 'mobileExist'
            res.send({ result, data: null })
        }
        else if (user.status) {
            result = 'success'
            res.send({ result, data: user.user })
        }
        else {
            res.send({ result, error: user.error, data: null })
        }

    }).catch(err => {
        res.send({ result, error: err.toString(), data: null })
    })
}

adminSignUp = (req, res) => {
    let result = 'fail'
    req.body.role_id = 1
    accountService.signup(req.body).then(user => {
        if (user.status === 'emailExist') {
            result = 'emailExist'
            res.send({ result, data: null })
        }
        else if (user.status === 'mobileExist') {
            result = 'mobileExist'
            res.send({ result, data: null })
        }
        else if (user.status) {
            result = 'success'
            res.send({ result, data: user.user })
        }
        else {
            res.send({ result, error: user.error, data: null })
        }

    }).catch(err => {
        res.send({ result, error: err.toString(), data: null })
    })
}


router.post('/userlogin', validate(userLoginValidator), userLogin)
router.post('/adminlogin', validate(userLoginValidator), adminLogin)
router.post('/usersignup', validate(userSignUpValidator), userSignup)
router.post('/vendorsignup', validate(userSignUpValidator), vendorSignup)
router.post('/adminsignup', validate(userSignUpValidator), adminSignUp)

module.exports = router;
