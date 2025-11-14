import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api'; 

const LoginPage = () => {
  // Hooks que usaremos
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    
    const { login } = useAuth();
    const navigate = useNavigate();
    const [apiError, setApiError] = useState(null);


    const onSubmit = async (data) => {
        setApiError(null);
        try {
        
        const response = await api.post('/auth/login', data);

        login(response.token);

        navigate('/appointments');

        } catch (error) {
        console.error('Error de inicio de sesión:', error);
        setApiError(error.message || 'Credenciales inválidas');
        }
    };

    return (
        <div className="form-container">
        <h2>Iniciar Sesión</h2>
        
        {/* handleSubmit se encarga de la validación antes de llamar a onSubmit */}
        <form onSubmit={handleSubmit(onSubmit)}>
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
                {...register('password', { required: 'La contraseña es requerida' })}
            />
            {errors.password && <p className="error-message">{errors.password.message}</p>}
            </div>

            {/* Aquí mostramos errores del backend */}
            {apiError && <p className="error-message">{apiError}</p>}

            <button type="submit" className="btn">Iniciar Sesión</button>
        </form>
        </div>
    );
};

export default LoginPage;