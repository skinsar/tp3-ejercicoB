const patientService = require('../services/patientService');
const { validationResult } = require('express-validator');

exports.createPatient = async (req, res, next) => {

    try {
        const { first_name, last_name, dni, phone } = req.body;

        const newPatient = await patientService.createPatient({
            first_name,
            last_name,
            dni,
            phone
        });

        res.status(201).json(newPatient);

    } catch (error) {
        next(error);
    }
};