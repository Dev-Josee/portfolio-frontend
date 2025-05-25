import React from "react";
import "./Button.module.css";

const Button = ({ children, onclick, type = 'button', disabled = false, variant = 'primary'}) => {
    return(
        <button
        type={type}
        className={`button ${variant}`} 
        onClick={onclick}
        disabled={disabled}
        >
            
        {children}    
        </button>
    );
};

export default Button