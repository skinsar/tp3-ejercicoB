import React, { createContext, useState, useContext } from 'react';

// Contexto
const AuthContext = createContext(null);

// Crear el Proveedor (Provider)
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));

// Función de Login
    const login = (newToken) => {
        setToken(newToken);
        localStorage.setItem('token', newToken);
    };

// Función de Logout
    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

// Valor a exponer a los componentes hijos
    const value = {
        token,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
        {children}
        </AuthContext.Provider>
    );
    };

    export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};