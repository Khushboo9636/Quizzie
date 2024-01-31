import React from 'react';
import Modal from '../../Modal/Modal';
import style from './Style.module.css'; // Import your CSS module

function DeleteModal({ onClose, onConfirm }) {
    return (
        <Modal onClose={onClose}>
            <div className={style.popup}>
                <h2>Confirm Deletion</h2>
                <p>Are you sure you want to delete this quiz?</p>
                <div className={style.buttonGroup}>
                    <button onClick={onConfirm}>Confirm</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </Modal>
    );
}

export default DeleteModal;
