const pool = require('../db');

exports.getAllAppointments = async () => {
    const [rows] = await pool.query(`
        SELECT 
        a.id, a.appointment_date, a.status, a.observations,
        p.id AS patient_id, p.first_name AS patient_first_name, p.last_name AS patient_last_name, p.dni,
        d.id AS doctor_id, d.first_name AS doctor_first_name, d.last_name AS doctor_last_name, d.specialty
        FROM appointments a
        JOIN patients p ON a.patient_id = p.id
        JOIN doctors d ON a.doctor_id = d.id
        ORDER BY a.appointment_date DESC
    `);
    return rows;
};

// crea una cita
exports.createAppointment = async (data) => {
    const { patient_id, doctor_id, appointment_date, observations } = data;
    


    const [result] = await pool.query(
        'INSERT INTO appointments (patient_id, doctor_id, appointment_date, observations, status) VALUES (?,?,?,?,?)',
        [patient_id, doctor_id, appointment_date, observations || null, 'Pending']
    );

// Devuelve la cita recién creada
  const [newAppointment] = await pool.query('SELECT * FROM appointments WHERE id =?', [result.insertId]);
    return newAppointment;
};

// Actualiza una cita
exports.updateAppointment = async (id, data) => {
    const { status, observations } = data;
    const [result] = await pool.query(
        'UPDATE appointments SET status =?, observations =? WHERE id =?',
        [status, observations, id]
    );

    if (result.affectedRows=== 0) {
        const error = new Error('Cita no encontrada');
        error.statusCode = 404;
        throw error;
    }
    
    const [updatedAppointment] = await pool.query('SELECT * FROM appointments WHERE id =?', [id]);
    return updatedAppointment;
};
