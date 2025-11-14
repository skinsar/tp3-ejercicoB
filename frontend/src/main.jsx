import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//componentes
import MainLayout from './components/MainLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AppointmentsPage from './pages/AppointmentsPage';

// guardia de seguridad
import ProtectedRoute from './components/ProtectedRoute';

// Importa CSS
import './index.css';

// Importa AuthProvider
import { AuthProvider } from './context/AuthContext';

// Configuración de las rutas
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },


      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/appointments',
            element: <AppointmentsPage />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);