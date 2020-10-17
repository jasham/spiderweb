const { Router } = require('express')
var router = Router()
const { main } = require('../helper/db')
const { checkAuthentication } = require('../helper/auth')


router.use('/api/v1',require('../controllers/account'))
router.use('/api/v1/service',main,require('../controllers/service'))
router.use('/api/v1/category',main,require('../controllers/category'))
router.use('/api/v1/sub_category',main,checkAuthentication,require('../controllers/sub_category'))
router.use('/api/v1/image',main,require('../controllers/image'))
router.use('/api/v1/socket',main,checkAuthentication,require('../controllers/socket'))

module.exports = router