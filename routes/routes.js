const { Router } = require('express');
var router = Router();
const { main } = require('../helper/db')
const { checkAuthentication } = require('../helper/auth')

router.use('/api/v1/services',main,checkAuthentication,require('../controllers/services'));
router.use('/api/v1/category',main,checkAuthentication,require('../controllers/category'));
router.use('/api/v1/socket',main,checkAuthentication,require('../controllers/socket'));

module.exports = router; 