const appointmentService = require('../services/appointmentService');
const { validationResult }= require('express-validator');

exports.getAllAppointments = async (req, res, next) => {
    try {
        const appointments= await appointmentService.getAllAppointments();
        res.json(appointments);
    } catch (error) {
        next(error);
    }
    };

    exports.createAppointment = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const newAppointment = await appointmentService.createAppointment(req.body);
        res.status(201).json(newAppointment);
    } catch (error) {
        next(error);
    }
};

exports.updateAppointment = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {

        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const updatedAppointment = await appointmentService.updateAppointment(req.params.id, req.body);
        res.json(updatedAppointment);
    } catch (error) {
        next(error);
    }
};