const { Router } = require('express');
const router = Router();



// router.use('/api/v1/user',require('../controllers/student'));
router.use('/api/v1/services',require('../controllers/services'));
router.use('/api/v1/bookings',require('../controllers/bookings.controller'));
router.use('/api/v1/account', require('../controllers/auth'));


module.exports = router;