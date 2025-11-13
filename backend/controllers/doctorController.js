const doctorService = require('../services/doctorService');

exports.createDoctor = async (req, res, next) => {
    try {
        // 1. Obtiene los datos del body de la petición
        const { first_name, last_name, specialty } = req.body;

        // 2. Llama al "experto en BD" (Servicio) para crear el doctor
        const newDoctor = await doctorService.createDoctor({
            first_name,
            last_name,
            specialty
        });
// 
        // 3. Devuelve una respuesta JSON exitosa (201 Creado)
        // Esto también arreglará el error en tu 'api.http'
        res.status(201).json(newDoctor);

    } catch (error) {
        // Si el servicio lanza un error, lo pasa al manejador
        // de errores general (el que está en app.js).
        next(error);
    }
};