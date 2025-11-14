import React from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <div className="main-layout">
        <nav>
            <h1>Sistema de Citas Médicas</h1>
            {/* Enlaces de navegación vendran por acá*/}
        </nav>
        
        <main>
            {/**/}
            {/**/}
            <Outlet />
        </main>
        
        <footer>
            <p>© 2025 Programación IV</p>
        </footer>
        </div>
    );
};

export default MainLayout;