const { body, validationResult } = require('express-validator')

const categoryValidationRules = [
    body('category')
        .not().isEmpty().withMessage('category_name should not be empty')
        .isString().withMessage('category_name is not string')
        .isLength({ min :3, max : 30}).withMessage('category_name length error')
        .trim()
]

module.exports = {
    categoryValidationRules,
}