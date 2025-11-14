import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '../services/api';

const DoctorModal = ({ doctorToEdit, onClose, onSave }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [apiError, setApiError] = useState(null);

    const isEditMode = Boolean(doctorToEdit);

    useEffect(() => {
        setApiError(null); 
        if (isEditMode) {
        reset(doctorToEdit);
        } else {
        reset({
            first_name: '',
            last_name: '',
            specialty: '',
            matricula_profesional: ''
        });
        }
    }, [doctorToEdit, reset, isEditMode]);

    const onSubmit = async (data) => {
        setApiError(null); 
        try {
        let savedDoctor;
        if (isEditMode) {
            savedDoctor = await api.put(
            `/doctors/${doctorToEdit.id}`,
            data
            );
        } else {
            savedDoctor = await api.post('/doctors', data);
        }
        onSave(savedDoctor); 
        } catch (error) {
        console.error('Error al guardar el médico:', error);
        setApiError(error.message || 'Error al guardar. Intente de nuevo.');
        }
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            
            <h3>{isEditMode ? 'Editar Médico' : 'Crear Nuevo Médico'}</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="form-container">
            
            <div className="form-group">
                <label>Nombre</label>
                <input
                {...register('first_name', { required: 'El nombre es requerido' })}
                />
                {errors.first_name && <p className="error-message">{errors.first_name.message}</p>}
            </div>

            <div className="form-group">
                <label>Apellido</label>
                <input
                {...register('last_name', { required: 'El apellido es requerido' })}
                />
                {errors.last_name && <p className="error-message">{errors.last_name.message}</p>}
            </div>

            <div className="form-group">
                <label>Especialidad</label>
                <input
                {...register('specialty', { required: 'La especialidad es requerida' })}
                />
                {errors.specialty && <p className="error-message">{errors.specialty.message}</p>}
            </div>

            <div className="form-group">
                <label>Matrícula Profesional</label>
                <input
                {...register('matricula_profesional')}
                />
            </div>

            {apiError && <p className="error-message">{apiError}</p>}
            
            <div className="modal-actions">
                <button type="submit" className="btn">
                {isEditMode ? 'Guardar Cambios' : 'Crear Médico'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancelar
                </button>
            </div>
            </form>

        </div>
        </div>
    );
    };

export default DoctorModal;