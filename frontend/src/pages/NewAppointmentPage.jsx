import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';

const NewAppointmentPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formError, setFormError] = useState(null);

// useEffect se usa aquí para cargar los datos antes de mostrar el formulario
    useEffect(() => {
        const loadDependencies = async () => {
        try {
            setLoading(true);
            const [patientsData, doctorsData] = await Promise.all([
            api.get('/patients'),
            api.get('/doctors'),
            ]);

            setPatients(patientsData);
            setDoctors(doctorsData);
            setLoading(false);
        } catch (error) {
            console.error('Error al cargar datos para el formulario:', error);
            setLoading(false);
            setFormError('No se pudieron cargar los datos de pacientes y médicos. Asegúrese de que la API funciona.');
        }
        };

        loadDependencies();
    }, []);

    const onSubmit = async (data) => {
        try {
        setFormError(null);
        await api.post('/appointments', data);
        
        // Si todo va bien, volvemos a la lista de citas
        navigate('/appointments');
        } catch (error) {
        console.error('Error al crear la cita:', error);
        setFormError(error.message || 'Error al crear la cita');
        }
    };

    if (loading) {
        return <div>Cargando formulario...</div>;
    }

    if (formError) {
        return <div style={{ color: 'red' }}>Error: {formError}</div>;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
        <h2>Crear Nueva Cita</h2>

        <div className="form-group">
            <label>Paciente</label>
            <select {...register('patient_id', { required: 'Debe seleccionar un paciente' })}>
            <option value="">-- Seleccione un Paciente --</option>
            {patients.map((p) => (
                <option key={p.id} value={p.id}>
                {p.first_name} {p.last_name} (DNI: {p.dni})
                </option>
            ))}
            </select>
            {errors.patient_id && <p className="error-message">{errors.patient_id.message}</p>}
        </div>

        <div className="form-group">
            <label>Médico</label>
            <select {...register('doctor_id', { required: 'Debe seleccionar un médico' })}>
            <option value="">-- Seleccione un Médico --</option>
            {doctors.map((d) => (
                <option key={d.id} value={d.id}>
                Dr. {d.first_name} {d.last_name} ({d.specialty})
                </option>
            ))}
            </select>
            {errors.doctor_id && <p className="error-message">{errors.doctor_id.message}</p>}
        </div>

        <div className="form-group">
            <label>Fecha y Hora</label>
            <input
            type="datetime-local"
            {...register('appointment_date', { required: 'La fecha es requerida' })}
            />
            {errors.appointment_date && <p className="error-message">{errors.appointment_date.message}</p>}
        </div>

        <div className="form-group">
            <label>Observaciones (Opcional)</label>
            <textarea {...register('observations')}></textarea>
        </div>

        <button type="submit" className="btn">Guardar Cita</button>
        </form>
    );
};

export default NewAppointmentPage;