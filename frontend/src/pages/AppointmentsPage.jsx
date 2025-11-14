import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import AppointmentEditModal from '../components/AppointmentEditModal';

const AppointmentsPage = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [editingAppointment, setEditingAppointment] = useState(null);

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

    const handleSave = (updatedAppointment) => {
        setAppointments((currentAppointments) =>
        currentAppointments.map((appt) =>
            appt.id === updatedAppointment.id ? updatedAppointment : appt
        )
        );
        setEditingAppointment(null);
    };

    if (loading) return <div>Cargando citas...</div>;
    if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

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
                {/*columna de Acciones*/}
                <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
            {appointments.length === 0 ? (
                <tr><td colSpan="7" style={{ textAlign: 'center' }}>No hay citas.</td></tr>
            ) : (
                appointments.map((appt) => (
                <tr key={appt.id}>
                    <td>{appt.id}</td>
                    <td>{appt.patient_first_name} {appt.patient_last_name}</td>
                    <td>{appt.doctor_first_name} {appt.doctor_last_name}</td>
                    <td>{appt.specialty}</td>
                    <td>{new Date(appt.appointment_date).toLocaleString()}</td>
                    <td>{appt.status}</td>
                    {/*botón de Editar*/}
                    {/*clic, cita en el estado editingAppointment */}
                    <td>
                    <button 
                        className="btn btn-secondary" 
                        onClick={() => setEditingAppointment(appt)}
                    >
                        Editar
                    </button>
                    </td>
                </tr>
                ))
            )}
            </tbody>
        </table>

        {/*Renderizar el modal*/}
        {/*mostrará si editingAppointment no es null*/}
        <AppointmentEditModal
            appointment={editingAppointment}
            onClose={() => setEditingAppointment(null)}
            onSave={handleSave}
        />
        </div>
    );
};

export default AppointmentsPage;