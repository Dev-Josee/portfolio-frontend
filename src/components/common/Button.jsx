import React from "react";
import "./Button.module.css";

const Button = ({ children, onClick, type = 'button', disabled = false, variant = 'primary'}) => {
    return(
        <button
        type={type}
        className={`button ${variant}`} 
        onClick={onClick}
        disabled={disabled}
        >
            
        {children}    
        </button>
    );
};

export default Button