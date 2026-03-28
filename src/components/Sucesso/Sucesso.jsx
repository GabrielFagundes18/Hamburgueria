import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaWhatsapp, FaArrowLeft } from "react-icons/fa";
import "./styles.css";

const Sucesso = () => {
  const navigate = useNavigate();


  useEffect(() => {
    localStorage.removeItem("@NinjaBurger:cart");
  }, []);

  return (
    <div className="sucesso-container">
      <div className="sucesso-card">
        <div className="icon-box">
          <FaCheckCircle className="check-icon" />
        </div>
        
        <h1>Pedido Recebido!</h1>
        <p>
          Obrigado por escolher o <strong>Ninja Burger</strong>. 
          Seu pedido já está sendo preparado com todo cuidado.
        </p>

        <div className="info-box">
          <span>O que acontece agora?</span>
          <ul>
            <li>Você receberá uma confirmação no WhatsApp.</li>
            <li>O tempo estimado de entrega é de 30-50 min.</li>
          </ul>
        </div>

        <div className="actions-sucesso">
          <button 
            className="btn-whatsapp" 
            onClick={() => window.open("https://wa.me/5511999999999", "_blank")}
          >
            <FaWhatsapp /> Acompanhar no Whats
          </button>
          
          <button className="btn-voltar" onClick={() => navigate("/")}>
            <FaArrowLeft /> Voltar ao Início
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sucesso;