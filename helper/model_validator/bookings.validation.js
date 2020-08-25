const { body, validationResult } = require('express-validator')

const bookingsValidationRules = [
    body('user_id')
        .isString()
        .isLength({ min :3, max : 30}),
    body('service_id')
        .isString()
        .isLength({ min :3, max : 30}),
    body('description').isString(),
    body('status')
        .isString()
        .isLength({min:3, max:15}),
    body('amount').isCurrency()
]

module.exports = {
    bookingsValidationRules,
}