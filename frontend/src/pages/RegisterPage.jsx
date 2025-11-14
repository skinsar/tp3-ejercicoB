import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';

const RegisterPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm();
    
    const navigate = useNavigate();
    const [apiError, setApiError] = useState(null);


    const password = watch('password');

    const onSubmit = async (data) => {
        setApiError(null);
        try {

        const { nombre, email, password, role } = data;
        await api.post('/auth/register', { nombre, email, password, role });

        navigate('/login');

        } catch (error) {
        console.error('Error de registro:', error);
        setApiError(error.message || 'Error al registrar. Intente de nuevo.');
        }
    };

    return (
        <div className="form-container">
        <h2>Crear Cuenta</h2>
        
        <form onSubmit={handleSubmit(onSubmit)}>
            
            <div className="form-group">
            <label>Nombre</label>
            <input
                {...register('nombre', { required: 'El nombre es requerido' })}
            />
            {errors.nombre && <p className="error-message">{errors.nombre.message}</p>}
            </div>

            <div className="form-group">
            <label>Email</label>
            <input
                type="email"
                {...register('email', { required: 'El email es requerido' })}
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
            </div>
            
            <div className="form-group">
            <label>Contraseña</label>
            <input
                type="password"
                {...register('password', { 
                required: 'La contraseña es requerida',
                minLength: { value: 6, message: 'Debe tener al menos 6 caracteres' }
                })}
            />
            {errors.password && <p className="error-message">{errors.password.message}</p>}
            </div>

            <div className="form-group">
            <label>Confirmar Contraseña</label>
            <input
                type="password"
                {...register('confirmPassword', { 
                required: 'Debe confirmar la contraseña',
                validate: (value) =>
                    value === password || 'Las contraseñas no coinciden'
                })}
            />
            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword.message}</p>}
            </div>

            {apiError && <p className="error-message">{apiError}</p>}

            <button type="submit" className="btn">Registrarse</button>

            <div className="form-footer">
            <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
            </div>
        </form>
        </div>
    );
    };

export default RegisterPage;