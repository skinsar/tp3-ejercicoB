// Importar dotenv para cargar variables de entorno
require('dotenv').config() ;

// Importar dependencias
const express = require('express');
const cors = require('cors');
const pool = require('./db') ; 

// Inicializar la aplicación Express
const app = express();

//Configurar Middlewares
app.use(cors());


app.use(express.json()); 

// Rutas de prueba
app.get('/', (req, res) => {
    res.send ('API del Sistema de Citas Médicas funcionando');
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

// Iniciar el servidor
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});