const { body, validationResult } = require('express-validator')

const userLoginValidator = [
    body('emailOrMobile')
        .not().isEmpty().withMessage('Please enter email id or mobile no.')
        .trim(),
    body('password')
        .not().isEmpty().withMessage('Password should not be empty.')
        .isLength({ min : 8, max : 30}).withMessage('Password length error. Min length is 8 and maximum is 30.')
        .trim(),
]

module.exports = {
    userLoginValidator,
}