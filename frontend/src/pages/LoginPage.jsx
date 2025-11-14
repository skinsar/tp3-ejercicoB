import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';

const LoginPage = () => {
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

            {apiError && <p className="error-message">{apiError}</p>}

            <button type="submit" className="btn">Iniciar Sesión</button>

            {}
            <div className="form-footer">
            <p>¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link></p>
            </div>
        </form>
        </div>
    );
    };

export default LoginPage;