import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import PatientModal from '../components/PatientModal';

const PatientsPage = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);

    useEffect(() => {
        const fetchPatients = async () => {
        try {
            setLoading(true);
            const data = await api.get('/patients');
            setPatients(data);
            setError(null);
        } catch (err) {
            console.error('Error al obtener pacientes:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
        };

        fetchPatients();
    }, []);


    const handleCreate = () => {
        setSelectedPatient(null);
        setIsModalOpen(true);
    };

    const handleEdit = (patient) => {
        setSelectedPatient(patient); 
        setIsModalOpen(true);
    };

// Cierra el modal
    const handleClose = () => {
        setIsModalOpen(false);
        setSelectedPatient(null);
    };

//Función onSave que se pasa al modal
    const handleSave = (savedPatient) => {
        if (selectedPatient) {
        setPatients(patients.map(p => 
            p.id === savedPatient.id ? savedPatient : p
        ));
        } else {
        setPatients([...patients, savedPatient]);
        }
        handleClose();
    };

    if (loading) return <div>Cargando pacientes...</div>;
    if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

    return (
        <div>
        <h2>Gestión de Pacientes</h2>
        
        {/* botón Crear*/}
        <button className="btn" onClick={handleCreate} style={{ marginBottom: '1rem' }}>
            Crear Nuevo Paciente
        </button>
        
        <table className="data-table">
            <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>DNI</th>
                <th>Teléfono</th>
                <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
            {patients.length === 0 ? (
                <tr><td colSpan="6" style={{ textAlign: 'center' }}>No hay pacientes.</td></tr>
            ) : (
                patients.map((patient) => (
                <tr key={patient.id}>
                    <td>{patient.id}</td>
                    <td>{patient.first_name}</td>
                    <td>{patient.last_name}</td>
                    <td>{patient.dni}</td>
                    <td>{patient.phone || 'N/A'}</td>
                    <td>
                    {/*botón de Editar*/}
                    <button className="btn btn-secondary" onClick={() => handleEdit(patient)}>
                        Editar
                    </button>
                    </td>
                </tr>
                ))
            )}
            </tbody>
        </table>

        {/* Renderizar el modal*/}
        {/* Solo se muestra si isModalOpen es true */}
        {isModalOpen && (
            <PatientModal
            patientToEdit={selectedPatient}
            onClose={handleClose}
            onSave={handleSave}
            />
        )}
        </div>
    );
};

export default PatientsPage;