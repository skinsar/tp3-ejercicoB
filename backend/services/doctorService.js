const pool = require('../db');

exports.createDoctor = async ({ first_name, last_name, specialty }) => {
    try {
        // Inserta el doctor en la BD
        const [result] = await pool.query(
            'INSERT INTO doctors (first_name, last_name, specialty) VALUES (?, ?, ?)',
            [first_name, last_name, specialty]
        );

        return {
            id: result.insertId,
            first_name,
            last_name,
            specialty
        };
    } catch (error) {
        throw error;
    }
};