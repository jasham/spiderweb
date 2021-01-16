const { Router } = require('express')
var router = Router()
const { main } = require('../helper/db')
const { checkAuthentication } = require('../helper/auth')


router.use('/api/v1', require('../controllers/account'))
router.use('/api/v1/category', main, checkAuthentication, require('../controllers/category'))
router.use('/api/v1/sub_category', main, checkAuthentication, require('../controllers/sub_category'))
router.use('/api/v1/service', main, checkAuthentication, require('../controllers/service'))
router.use('/api/v1/image', main, checkAuthentication, require('../controllers/image'))
//router.use('/api/v1/socket', main, checkAuthentication, require('../controllers/socket'))
router.use('/api/v1/user/sub_category', main, require('../controllers/user_end/sub_category'))
router.use('/api/v1/user/booking', main, require('../controllers/booking'))// after testing need to add "checkAuthentication"
router.use('/api/v1/vendor', main,checkAuthentication, require('../controllers/vendor'))
router.use('/api/v1/address', main,checkAuthentication, require('../controllers/address'))

module.exports = router