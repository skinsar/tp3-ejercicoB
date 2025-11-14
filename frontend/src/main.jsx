import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
//componentes
import MainLayout from './components/MainLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AppointmentsPage from './pages/AppointmentsPage';
import NewAppointmentPage from './pages/NewAppointmentPage';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import PatientsPage from './pages/PatientsPage';
import DoctorsPage from './pages/DoctorsPage';

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
          {
            path: '/appointments/new',
            element: <NewAppointmentPage />,
          },
          {
            path: '/patients',
            element: <PatientsPage />,
          },
          {
            path: '/doctors',
            element: <DoctorsPage />,
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