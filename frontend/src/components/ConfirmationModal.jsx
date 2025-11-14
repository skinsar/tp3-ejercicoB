import React from 'react';

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="modal-backdrop" onClick={onCancel}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Confirmación Requerida</h3>
            <p>{message}</p>
            <div className="modal-actions">
            {}
            <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={onCancel}
            >
                Cancelar
            </button>
            
            {}
            <button 
                type="button" 
                className="btn btn-danger" 
                onClick={onConfirm}
            >
                Confirmar Eliminación
            </button>
            </div>
        </div>
        </div>
    );
};

export default ConfirmationModal;