const { body, validationResult } = require('express-validator');

const loginValidator = [
  body('username')
    .notEmpty().withMessage('Username is required'),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 3 }).withMessage('Password must be at least 3 characters long'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

      return res.status(400).json({ message: errors.errors[0].msg });
    }
    next();
  }
];

module.exports = loginValidator;