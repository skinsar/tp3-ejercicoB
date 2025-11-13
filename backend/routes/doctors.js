const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const { authenticate } = require('../middleware/passport');

router.post(
    '/',
    authenticate, 
    doctorController.createDoctor
);


module.exports = router;