const { body, validationResult } = require('express-validator')

const userSignUpValidator = [
    body('name')
        .not().isEmpty().withMessage('Username should not be empty.')
        .isString().withMessage('Username is not string.')
        .isLength({ min :3, max : 30}).withMessage('Username length error.')
        .trim(),
    body('email')
        .not().isEmpty().withMessage('Email should not be empty.')
        .isEmail().withMessage("Please enter correcy email.")
        .isLength({ min : 3, max : 30}).withMessage('Email length error.')
        .trim(),
    body('password')
        .not().isEmpty().withMessage('Password should not be empty.')
        .isLength({ min : 8, max : 30}).withMessage('Password length error.')
        .trim(),
    body('mobileno')
        .not().isEmpty().withMessage('Mobile No should not be empty.')
        .isInt().withMessage('Mobile number incorrect.')
        .isLength({ min : 10, max : 30}).withMessage('Mobile no length error.')
        .trim()
]

module.exports = {
    userSignUpValidator,
}