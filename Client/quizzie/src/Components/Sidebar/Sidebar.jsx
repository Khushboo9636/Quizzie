import React from 'react';
import style from './Style.module.css';
import { useNavigate } from 'react-router';

function Sidebar({ onCreateQuiz, onSelectPage }) {
    const navigate = useNavigate();
    const handleDashboardClick = () => {
        console.log('Dashboard clicked');
        onSelectPage('dashboard'); 
    };

    const handleAnalyticsClick = () => {
        console.log('Analytics clicked');
        onSelectPage('analytics'); 
    };
    const handleLogOut = () => {
       
        localStorage.removeItem('token');
        
        navigate('/'); 
    }


    return (
        <div className={style.sideBar}>
            <div className={style.heading}>
                <h2 className={style.h2}>QUIZZIE</h2>
            </div>
            <div className={style.main}>
                <div className={style.btnsGroup}>
                    <button className={style.dashboard} onClick={handleDashboardClick}>
                        Dashboard
                    </button>
                    <button className={style.analytics} onClick={handleAnalyticsClick}>
                        Analytics
                    </button>
                    <button className={style.createQuiz} onClick={onCreateQuiz}>
                        Create Quiz
                    </button>
                </div>
            </div>
            <div className={style.line}></div>
            <div className={style.Logout} onClick={handleLogOut}>Logout</div>
        </div>
    );
}

export default Sidebar;
