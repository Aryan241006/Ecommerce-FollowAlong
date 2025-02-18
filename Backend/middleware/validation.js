const { body, validationResult } = require('express-validator');

const validateUser = [
    body('username').trim().isLength({ min: 3 }).escape(),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 })
];

const validateProduct = [
    body('name').trim().isLength({ min: 2 }).escape(),
    body('description').trim().isLength({ min: 10 }).escape(),
    body('price').isFloat({ min: 0 }),
    body('stock').isInt({ min: 0 }),
    body('category').trim().isLength({ min: 2 }).escape()
];

const validateOrder = [
    body('items').isArray({ min: 1 }),
    body('items.*.product').isMongoId(),
    body('items.*.quantity').isInt({ min: 1 }),
    body('shippingAddress').isObject(),
    body('shippingAddress.street').trim().notEmpty(),
    body('shippingAddress.city').trim().notEmpty(),
    body('shippingAddress.state').trim().notEmpty(),
    body('shippingAddress.zipCode').trim().notEmpty(),
    body('shippingAddress.country').trim().notEmpty()
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validateUser,
    validateProduct,
    validateOrder,
    validate
};