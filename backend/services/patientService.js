const pool = require('../db');

exports.createPatient = async ({ first_name, last_name, dni, phone }) => {
    try {
        // Inserta el paciente en la BD
        const [result] = await pool.query(
            'INSERT INTO patients (first_name, last_name, dni, phone) VALUES (?, ?, ?, ?)',
            [first_name, last_name, dni, phone || null]
        );
        return {
            id: result.insertId,
            first_name,
            last_name,
            dni,
            phone
        };
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            const err = new Error('Ya existe un paciente con ese DNI.');
            err.statusCode = 400;
            throw err;
        }
        throw error;
    }
};