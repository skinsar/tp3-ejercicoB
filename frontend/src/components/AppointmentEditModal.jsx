import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '../services/api';

const AppointmentEditModal = ({ appointment, onClose, onSave }) => {
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        if (appointment) {
        reset({
            status: appointment.status,
            observations: appointment.observations || '',
        });
        }
    }, [appointment, reset]);

    const onSubmit = async (data) => {
        try {
// Llama a la API PUT para actualizar
        const updatedAppointment = await api.put(
            `/appointments/${appointment.id}`,
            data
        );
        
// Llama a la función onSave (del padre) con la cita actualizada
        onSave(updatedAppointment[0]);
        } catch (error) {
        console.error('Error al actualizar la cita:', error);
        }
    };

    if (!appointment) {
        return null;
    }

    // Si hay una 'appointment', mostramos el modal:
    return (
        <div className="modal-backdrop" onClick={onClose}>
        
        {/* "Content" */}
        {/*e.stopPropagation()*/}
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            
            <h3>Editar Cita ID: {appointment.id}</h3>
            <p>Paciente: {appointment.patient_first_name} {appointment.patient_last_name}</p>

            <form onSubmit={handleSubmit(onSubmit)} className="form-container">
            <div className="form-group">
                <label>Estado</label>
                <select {...register('status')}>
                <option value="Pending">Pendiente</option>
                <option value="Completed">Completada</option>
                <option value="Cancelled">Cancelada</option>
                </select>
            </div>

            <div className="form-group">
                <label>Observaciones</label>
                <textarea {...register('observations')}></textarea>
            </div>

            <div className="modal-actions">
                <button type="submit" className="btn">Guardar Cambios</button>
                {/* El boton cancelar simplemente llama a la función onClose */}
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancelar
                </button>
            </div>
            </form>

        </div>
        </div>
    );
};

export default AppointmentEditModal;