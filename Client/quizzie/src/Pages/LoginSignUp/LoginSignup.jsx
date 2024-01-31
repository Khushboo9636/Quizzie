import React, { useState } from 'react';

import style from './Style.module.css';
import SignUp from '../../Components/Signup/SignUp';
import Login from '../../Components/Login/Login';

function LoginSignup({handleSuccess }) {
    const [activeTab, setActiveTab] = useState('signup');
    const [signupSuccess, setSignupSuccess] = useState(false);
    //const navigate = useNavigate();
    
    const handleButtonClick = (tab) => {
        setActiveTab(tab);
        if (signupSuccess && tab === 'login') {
          setSignupSuccess(false); // Reset signupSuccess to false when switching to login tab
      }
    }

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        if (signupSuccess) {
            setSignupSuccess(false);
        }
    }

    const handleSignupSuccess = (success) => {
        setSignupSuccess(success);
        if (success) {
          setActiveTab('login'); // After signup success, navigate to login
           if (handleSuccess) {
            handleSuccess();
        }
      }
    }
    
    return (
        <div className={style.main}>
            <div className={style.mainContainer}>
                <div className={style.innerContainer}>
                    <div className={style.heading}>
                        <h1 className={style.h1}> QUIZZIE</h1>
                    </div>
                    <div className={style.btns}>
                        <button
                            className={`${style.buttons} ${activeTab === 'signup' ? style.active : ''}`}
                            onClick={() => {
                                handleButtonClick('signup');
                                handleTabChange('signup');
                            }}>
                            Sign Up
                        </button>
                        <button
                            className={`${style.buttons} ${activeTab === 'login' ? style.active : ''}`}
                            onClick={() => {
                                handleButtonClick('login');
                                handleTabChange('login');
                            }}>
                            Log In
                        </button>
                    </div>
                    <div className={style.formSection}>
                       {/* {activeTab === 'signup' ? <SignUp setSignupSuccess={handleSignupSuccess}/> : <Login/>}
                        {signupSuccess ? <Login /> : <SignUp setSignupSuccess={handleSignupSuccess} />}
                           */}
                           {activeTab === 'signup' && !signupSuccess && <SignUp setSignupSuccess={handleSignupSuccess} />}
                        {activeTab === ('login' || signupSuccess) && <Login/>} 
                       

                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginSignup;
