import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '../services/api';

const PatientModal = ({ patientToEdit, onClose, onSave }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [apiError, setApiError] = useState(null);
    
    const isEditMode = Boolean(patientToEdit);

    useEffect(() => {
        setApiError(null);
        if (isEditMode) {
        const formattedDate = patientToEdit.fecha_nacimiento 
            ? new Date(patientToEdit.fecha_nacimiento).toISOString().split('T')[0] 
            : '';
        reset({ ...patientToEdit, fecha_nacimiento: formattedDate });
        } else {
        reset({
            first_name: '',
            last_name: '',
            dni: '',
            fecha_nacimiento: '',
            obra_social: ''
        });
        }
    }, [patientToEdit, reset, isEditMode]);

    const onSubmit = async (data) => {
        setApiError(null);
        try {
        let savedPatient;
        if (isEditMode) {
            savedPatient = await api.put(
            `/patients/${patientToEdit.id}`,
            data
            );
        } else {
            savedPatient = await api.post('/patients', data);
        }
        onSave(savedPatient);
        } catch (error) {
        console.error('Error al guardar el paciente:', error);
        setApiError(error.message || 'Error al guardar. Intente de nuevo.');
        }
    };

    return (
        <div className="modal-backdrop" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            
            <h3>{isEditMode ? 'Editar Paciente' : 'Crear Nuevo Paciente'}</h3>

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
                <label>DNI</label>
                <input
                {...register('dni', { required: 'El DNI es requerido' })}
                />
                {errors.dni && <p className="error-message">{errors.dni.message}</p>}
            </div>

            <div className="form-group">
                <label>Fecha de Nacimiento</label>
                <input
                type="date"
                {...register('fecha_nacimiento')}
                />
            </div>

            <div className="form-group">
                <label>Obra Social</label>
                <input
                {...register('obra_social')}
                />
            </div>

            {apiError && <p className="error-message">{apiError}</p>}
            
            <div className="modal-actions">
                <button type="submit" className="btn">
                {isEditMode ? 'Guardar Cambios' : 'Crear Paciente'}
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

export default PatientModal;