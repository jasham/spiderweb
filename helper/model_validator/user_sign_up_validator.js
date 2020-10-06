const { body, validationResult } = require('express-validator')

const userSignUpValidator = [
    body('name')
        .not().isEmpty().withMessage('username should not be empty')
        .isString().withMessage('username is not string')
        .isLength({ min :3, max : 30}).withMessage('username length error')
        .trim(),
    body('email')
        .not().isEmpty().withMessage('email should not be empty')
        .isEmail().withMessage("string is not email")
        .isLength({ min : 3, max : 30}).withMessage('email length error')
        .trim(),
    body('password')
        .not().isEmpty().withMessage('password should not be empty')
        .isLength({ min : 8, max : 30}).withMessage('password length error')
        .trim(),
    body('mobileno')
        .not().isEmpty().withMessage('mobileno should not be empty')
        .isInt().withMessage('mobile number should be number')
        .isLength({ min : 10, max : 30}).withMessage('mobile no length error')
        .trim()
]

module.exports = {
    userSignUpValidator,
}