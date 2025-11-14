import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '../services/api';

const PatientModal = ({ patientToEdit, onClose, onSave }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const isEditMode = Boolean(patientToEdit);

    useEffect(() => {
        if (isEditMode) {
        reset(patientToEdit);
        } else {
        reset({
            first_name: '',
            last_name: '',
            dni: '',
            phone: ''
        });
        }
    }, [patientToEdit, reset, isEditMode]);

// Se llama al hacer clic en "Guardar"
    const onSubmit = async (data) => {
        try {
        let savedPatient;
        if (isEditMode) {
// Llamamos a la API con PUT para actualizar
            savedPatient = await api.put(
            `/patients/${patientToEdit.id}`,
            data
            );
        } else {
            savedPatient = await api.post('/patients', data);
        }
        
// Llamamos a la función onSave del padre con el paciente guardado
        onSave(savedPatient);

        } catch (error) {
        console.error('Error al guardar el paciente:', error);
        }
    };

    return (
        // Backdrop (fondo oscuro)
        <div className="modal-backdrop" onClick={onClose}>
        {/* Contenido (caja blanca) */}
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
                <label>Teléfono (Opcional)</label>
                <input {...register('phone')} />
            </div>

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