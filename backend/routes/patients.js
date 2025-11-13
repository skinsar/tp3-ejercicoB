const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const { authenticate } = require('../middleware/passport');

router.post(
    '/',
    authenticate,
    patientController.createPatient 
);

module.exports = router;