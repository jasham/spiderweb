const { body, validationResult } = require('express-validator')

const serviceValidationRules = [
    body('service_name')
        .isString()
        .isLength({ min :3, max : 30}),
]

module.exports = {
    serviceValidationRules,
}