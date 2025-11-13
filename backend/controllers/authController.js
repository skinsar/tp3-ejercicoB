const { validationResult }= require('express-validator');
const authService = require('../services/authService');

exports.register = async (req, res, next) => {
// Validar la entrada
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
// Pasar a la capa de servicio
        const { email, password, role } = req.body;
        const user = await authService.register({ email, password, role });
    
// Devolver
        res.status(201).json({ msg: 'Usuario registrado exitosamente' });


    } catch (error) {

        next(error);
    }
};
exports.login= async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.   array() });
    }

    const { email, password } = req.body;



    try {
        const token = await authService.login({ email,  password });
        res.json({ token });
    } catch (error) {
        next(error);
    }
};