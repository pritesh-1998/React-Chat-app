import React from 'react';
import './CustomModal.css';

const CustomModal = ({ isOpen, onClose, children, title }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className='modalTitle'>{title}</h2>
                <button className="close-btn" onClick={onClose}>✖</button>
                {children}
            </div>
        </div>
    );
};

export default CustomModal;
