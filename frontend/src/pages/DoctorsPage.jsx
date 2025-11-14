import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import DoctorModal from '../components/DoctorModal';

const DoctorsPage = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

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
        setIsModalOpen(true);
    };

    const handleEdit = (doctor) => {
        setSelectedDoctor(doctor);
        setIsModalOpen(true);
    };

    // Cierra el modal
    const handleClose = () => {
        setIsModalOpen(false);
        setSelectedDoctor(null);
    };

    const handleSave = (savedDoctor) => {
        if (selectedDoctor) {
        setDoctors(doctors.map(d => 
            d.id === savedDoctor.id ? savedDoctor : d
        ));
        } else {
        setDoctors([...doctors, savedDoctor]);
        }
        handleClose(); 
    };

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
                    <td>
                    <button className="btn btn-secondary" onClick={() => handleEdit(doctor)}>
                        Editar
                    </button>
                    </td>
                </tr>
                ))
            )}
            </tbody>
        </table>

        {/* Renderizar el modal */}
        {isModalOpen && (
            <DoctorModal
            doctorToEdit={selectedDoctor}
            onClose={handleClose}
            onSave={handleSave}
            />
        )}
        </div>
    );
};

export default DoctorsPage;