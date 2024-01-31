import React from 'react';
import style from './Style.module.css';

function Modal({ onClose, children }) {
    return (
        <div className={style.QmodalOverlay}>
            <div className={style.Qmodallayer}>
                <div className={style.QmodalContent}>
                    {children}
                    {/* <button onClick={onClose} className={style.closeButton}>
                        Close
                    </button> */}
                </div>
            </div>
        </div>
    );
}

export default Modal;
