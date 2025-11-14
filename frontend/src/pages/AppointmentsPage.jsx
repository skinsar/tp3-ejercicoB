import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api'; 

const AppointmentsPage = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAppointments = async () => {
        try {
            setLoading(true);
            const data = await api.get('/appointments');
            setAppointments(data);
            setError(null);
        } catch (err) {
            console.error('Error al obtener citas:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
        };

        fetchAppointments();
    }, []);

    if (loading) {
        return <div>Cargando citas...</div>;
    }

    if (error) {
        return <div style={{ color: 'red' }}>Error: {error}</div>;
    }

    return (
        <div>
        <h2>Dashboard de Citas</h2>
        <Link to="/appointments/new" className="btn">
            Crear Nueva Cita
        </Link>

        <table className="data-table">
            <thead>
            <tr>
                <th>ID</th>
                <th>Paciente</th>
                <th>Médico</th>
                <th>Especialidad</th>
                <th>Fecha</th>
                <th>Estado</th>
                {/* <th>Acciones</th> */}
            </tr>
            </thead>
            <tbody>
            {/* Si no hay citas, mostramos un mensaje */}
            {appointments.length === 0 ? (
                <tr>
                <td colSpan="6" style={{ textAlign: 'center' }}>
                    No hay citas registradas.
                </td>
                </tr>
            ) : (
                appointments.map((appt) => (
                <tr key={appt.id}>
                    <td>{appt.id}</td>
                    {/* Usamos los datos del join del backend */}
                    <td>{appt.patient_first_name} {appt.patient_last_name}</td>
                    <td>{appt.doctor_first_name} {appt.doctor_last_name}</td>
                    <td>{appt.specialty}</td>
                    {/* Formateamos la fecha para que sea legible */}
                    <td>{new Date(appt.appointment_date).toLocaleString()}</td>
                    <td>{appt.status}</td>
                    {/* <td>
                    <button>Editar</button>
                    </td> */}
                </tr>
                ))
            )}
            </tbody>
        </table>
        </div>
    );
};

export default AppointmentsPage;