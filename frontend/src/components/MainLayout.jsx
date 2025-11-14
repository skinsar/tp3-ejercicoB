import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const MainLayout = () => {
    const { token, logout } = useAuth(); //token y logout

    return (
        <div className="app-container">
        <header className="app-header">
            <div className="header-content">
            <Link to="/" className="logo">
                Sistema de Citas Médicas
            </Link>
            
            {/* Mostramos la navegacion solo si el usuario está logueado */}
            {token && (
                <nav className="app-nav">
                <Link to="/appointments">Citas</Link>
                <Link to="/patients">Pacientes</Link>
                <Link to="/doctors">Médicos</Link>
                <button onClick={logout} className="btn btn-secondary btn-logout">
                    Cerrar Sesión
                </button>
                </nav>
            )}
            </div>
        </header>
        
        <main className="main-content">
            <Outlet />
        </main>
        </div>
    );
};

export default MainLayout;