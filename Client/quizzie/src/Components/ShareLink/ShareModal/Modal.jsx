// Modal.jsx
import React from 'react';
import style from './Style.module.css';

function Modal({ children, onClose }) {
    const handleClickOutside = (event) => {
        if (event.target.classList.contains(style.share_modalOverlay)) {
            onClose(); // Close the modal if clicked outside
        }
    };

    return (
        <div className={style.share_modalOverlay} onClick={handleClickOutside}>
            <div className={style.share_modalbody}>
                <div className={style.share_modalContent}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;
