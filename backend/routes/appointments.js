const express = require('express');
const router = express.Router();
const { body }= require('express-validator');
const appointmentController = require('../controllers/appointmentController');
const { authenticate } = require('../middleware/passport');

router.get('/', authenticate, appointmentController.getAllAppointments);


    router.post(
    '/',
    authenticate,
    appointmentController.createAppointment
    );

    router.put(
    '/:id',
    authenticate,
    appointmentController.updateAppointment
    );

module.exports= router;