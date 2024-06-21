const { body, validationResult } = require('express-validator');

const registerValidator = [
  body('name')
    .notEmpty().withMessage('Name is required! Please enter a valid name.')
    .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long.'),
  body('email')
    .notEmpty().withMessage('Email is required! Please enter a valid email.')
    .isEmail().withMessage('Invalid email address.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.errors[0].msg });
    }
    next();
  }
];

module.exports = registerValidator;
