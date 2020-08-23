const { Router } = require('express');
var router = Router();


// router.use('/api/v1/user',require('../controllers/student'));
router.use('/api/v1/services',require('../controllers/services'));

module.exports = router;