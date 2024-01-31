// Button.js
import React from 'react';
import style from './Style.module.css';

function Button({ onClick, children }) {
  return (
    <div>
      <button className={style.buttons} onClick={onClick}>
        {children}
      </button>
    </div>
  );
}

export default Button;
