const { body, validationResult } = require('express-validator')

const userSignUpValidator = [
    body('name')
        .not().isEmpty().withMessage('Username should not be empty.')
        .isString().withMessage('Username is not string.')
        .isLength({ min :3, max : 30}).withMessage('Username length error. Minimum length is 3 and maximum is 30.')
        .trim(),
    body('email')
        .not().isEmpty().withMessage('Email should not be empty.')
        .isEmail().withMessage("Please enter correct email.")
        .isLength({ min : 5, max : 30}).withMessage('Email length error. Min length is 5 and maximum is 30.')
        .trim(),
    body('password')
        .not().isEmpty().withMessage('Password should not be empty.')
        .isLength({ min : 8, max : 30}).withMessage('Password length error. Min length is 8 and maximum is 30.')
        .trim(),
    body('mobile')
        .not().isEmpty().withMessage('Mobile No should not be empty.')
        .isInt().withMessage('Mobile number incorrect.')
        .isLength({ min : 10, max : 30}).withMessage('Mobile no length error. Minimum length is 10.')
        .trim()
]

module.exports = {
    userSignUpValidator,
}