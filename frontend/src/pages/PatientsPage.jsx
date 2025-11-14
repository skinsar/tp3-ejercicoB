import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import PatientModal from '../components/PatientModal';
import ConfirmationModal from '../components/ConfirmationModal';

const PatientsPage = () => {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [patientToDelete, setPatientToDelete] = useState(null);

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
        setIsEditModalOpen(true);
    };
    const handleEdit = (patient) => {
        setSelectedPatient(patient);
        setIsEditModalOpen(true);
    };
    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedPatient(null);
    };
    const handleSave = (savedPatient) => {
        if (selectedPatient) {
        setPatients(patients.map(p => (p.id === savedPatient.id ? savedPatient : p)));
        } else {
        setPatients([...patients, savedPatient]);
        }
        handleCloseEditModal();
    };

    const handleDelete = (patientId) => {
        setPatientToDelete(patientId);
    };

    const handleCloseDeleteModal = () => {
        setPatientToDelete(null);
    };

    const handleConfirmDelete = async () => {
        try {
// Llama a la API del backend
        await api.delete(`/patients/${patientToDelete}`);
        
// Actualiza la lista del frontend
        setPatients(patients.filter(p => p.id !== patientToDelete));
        
// Cierra el modal
        handleCloseDeleteModal();
        } catch (error) {
        console.error('Error al eliminar el paciente:', error);
        setError(error.message);
        handleCloseDeleteModal();
        }
    };

    if (loading) return <div>Cargando pacientes...</div>;
    if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

    return (
        <div>
        <h2>Gestión de Pacientes</h2>
        
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
                    
                    {}
                    <td className="actions-cell">
                    <button className="btn btn-secondary" onClick={() => handleEdit(patient)}>
                        Editar
                    </button>
                    {}
                    <button className="btn btn-danger" onClick={() => handleDelete(patient.id)}>
                        Eliminar
                    </button>
                    </td>
                </tr>
                ))
            )}
            </tbody>
        </table>

        {}
        {isEditModalOpen && (
            <PatientModal
            patientToEdit={selectedPatient}
            onClose={handleCloseEditModal}
            onSave={handleSave}
            />
        )}
        {}
        {}
        {patientToDelete && (
            <ConfirmationModal
            message="¿Estás seguro de que deseas eliminar este paciente? Esta acción no se puede deshacer."
            onConfirm={handleConfirmDelete}
            onCancel={handleCloseDeleteModal}
            />
        )}
        </div>
    );
};

export default PatientsPage;