import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import DoctorModal from '../components/DoctorModal';
import ConfirmationModal from '../components/ConfirmationModal'; // <-- El modal de confirmación

const DoctorsPage = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [doctorToDelete, setDoctorToDelete] = useState(null);

    useEffect(() => {
        const fetchDoctors = async () => {
        try {
            setLoading(true);
            const data = await api.get('/doctors');
            setDoctors(data);
            setError(null);
        } catch (err) {
            console.error('Error al obtener médicos:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
        };
        fetchDoctors();
    }, []);

    const handleCreate = () => {
        setSelectedDoctor(null);
        setIsEditModalOpen(true);
    };
    const handleEdit = (doctor) => {
        setSelectedDoctor(doctor);
        setIsEditModalOpen(true);
    };
    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedDoctor(null);
    };
    const handleSave = (savedDoctor) => {
        if (selectedDoctor) {
        setDoctors(doctors.map(d => (d.id === savedDoctor.id ? savedDoctor : d)));
        } else {
        setDoctors([...doctors, savedDoctor]);
        }
        handleCloseEditModal();
    };

    const handleDelete = (doctorId) => {
        setDoctorToDelete(doctorId);
    };

    const handleCloseDeleteModal = () => {
        setDoctorToDelete(null);
    };

    const handleConfirmDelete = async () => {
        try {
        await api.delete(`/doctors/${doctorToDelete}`);
        
        setDoctors(doctors.filter(d => d.id !== doctorToDelete));
        
        handleCloseDeleteModal();
        } catch (error) {
        console.error('Error al eliminar el médico:', error);
        setError(error.message);
        handleCloseDeleteModal();
        }
    };


    // --------------------------------------------------

    if (loading) return <div>Cargando médicos...</div>;
    if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

    return (
        <div>
        <h2>Gestión de Médicos</h2>
        
        <button className="btn" onClick={handleCreate} style={{ marginBottom: '1rem' }}>
            Crear Nuevo Médico
        </button>
        
        <table className="data-table">
            <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Especialidad</th>
                {}
                <th>Acciones</th>
            </tr>
            </thead>
            <tbody>
            {doctors.length === 0 ? (
                <tr><td colSpan="5" style={{ textAlign: 'center' }}>No hay médicos.</td></tr>
            ) : (
                doctors.map((doctor) => (
                <tr key={doctor.id}>
                    <td>{doctor.id}</td>
                    <td>{doctor.first_name}</td>
                    <td>{doctor.last_name}</td>
                    <td>{doctor.specialty}</td>
                    
                    {}
                    <td className="actions-cell">
                    <button className="btn btn-secondary" onClick={() => handleEdit(doctor)}>
                        Editar
                    </button>
                    {}
                    <button className="btn btn-danger" onClick={() => handleDelete(doctor.id)}>
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
            <DoctorModal
            doctorToEdit={selectedDoctor}
            onClose={handleCloseEditModal}
            onSave={handleSave}
            />
        )}

        {}
        {doctorToDelete && (
            <ConfirmationModal
            message="¿Estás seguro de que deseas eliminar este médico? Esta acción no se puede deshacer."
            onConfirm={handleConfirmDelete}
            onCancel={handleCloseDeleteModal}
            />
        )}
        </div>
    );
};

export default DoctorsPage;