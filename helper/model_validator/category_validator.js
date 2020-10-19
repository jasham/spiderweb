const { body, validationResult } = require('express-validator')

const categoryValidationRules = [
    body('category')
        .not().isEmpty().withMessage('category should not be empty')
        .isString().withMessage('category is not string')
        .isLength({ min :3, max : 30}).withMessage('category length error')
        .trim()
]

module.exports = {
    categoryValidationRules,
}