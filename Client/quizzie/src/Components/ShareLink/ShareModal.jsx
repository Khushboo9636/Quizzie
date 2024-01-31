// ShareModal.jsx
import React from 'react';
import style from './Style.module.css';
import Modal from './ShareModal/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ShareModal({ shareableLink, onClose }) {
    // Function to handle copying the shareable link
    const handleCopyLink = () => {
        navigator.clipboard.writeText(shareableLink);
        toast.success('Link copied to clipboard');
    };

    return (
        <Modal onClose={onClose}>
            <p className={style.para}>Congratulations! Your quiz is published.</p>
            <div className={style.shareLink}>{shareableLink}</div>
            <div className={style.btnContainer}>
                <button className={style.sharebtn} onClick={handleCopyLink}>
                    Share Link
                </button>
            </div>
            <ToastContainer /> 
        </Modal>
    );
}

export default ShareModal;


