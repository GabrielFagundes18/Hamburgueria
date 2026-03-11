import React from "react";
import "./style.css";

const Button = ({ children, onClick, type = "button", variant = "primary" }) => {
  return (
    <button 
      type={type} 
      className={`btn ${variant}`} 
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;