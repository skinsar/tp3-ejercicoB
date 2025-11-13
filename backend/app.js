// Importaciones
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');
const passport = require('passport');

// inicia la app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
require('./middleware/passport');

//  rutas

// Rutas de prueba
app.get('/', (req, res) => {
    res.send('API del Sistema de Citas Médicas funcionando');
});

// Ruta de prueba de base de datos
app.get('/ping', async (req, res) => {
    try {
        const [result] = await pool.query('SELECT "pong" AS result');
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al conectar con la base de datos');
    }
});

// Conecta las rutas de autenticación una vwz
app.use('/api/auth', require('./routes/auth'));

// Conecta las rutas de citas
app.use('/api/appointments', require('./routes/appointments'));

app.use('/api/patients', require('./routes/patients'));
app.use('/api/doctors', require('./routes/doctors'));

// Manejador de errores

app.use((err, req, res, next) => {
  console.error(err.stack); // Log del error para ti

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Error interno del servidor';

    res.status(statusCode).json({
        status: 'error',
        message: message,
    });
});

// 6. INICIAR EL SERVIDOR 
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});