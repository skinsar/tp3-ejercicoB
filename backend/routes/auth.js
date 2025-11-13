const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const authController = require('../controllers/authController');


router.post(
    '/register',
    [
        body('email', 'incluya un email válido').isEmail(),
        body('password', 'La contraseña debe tener 6 o más caracteres').isLength({
        min: 6,
    }),
    ],
    authController.register
);

router.post(
    '/login',
    [
        body('email', 'Por favor incluya un email válido').isEmail(),
        body('password', 'La contraseña es requerida').exists(),
    ],
    
    authController.login
);

module.exports = router;