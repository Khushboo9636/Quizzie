import React from 'react';
import { useLocation } from 'react-router-dom';
import style from './Style.module.css';
import tropy from '../../../../assets/tropgy.png'; 

function QAResult() {
  const location = useLocation();
  const { score } = location.state;

  return (
    <div className={style.mainContainer}>
      <div className={style.completionContainer}>
        <div className={style.heading}>Congrats Quiz is completed</div>
        <img src={tropy} alt="trophy" className={style.tropy}/>
        <div className={style.quizScore}>
          Your Score is: <span className={style.score}>{score}</span>
        </div>
      </div>      
    </div>
  );
}

export default QAResult;
