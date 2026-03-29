import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaCheckCircle, FaWhatsapp, FaArrowLeft } from "react-icons/fa";
import "./styles.css";

const Sucesso = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const orderId = location.state?.orderId || "Novo Pedido";

  useEffect(() => {

    localStorage.removeItem("@NinjaBurger:cart");
  }, []);

  const handleOpenWhatsapp = () => {
    const telefoneDono = "5511999999999"; 
    const mensagem = encodeURIComponent(
      `Olá! Gostaria de acompanhar o meu pedido #${orderId} no Ninja Burger. 🍔`
    );
    window.open(`https://wa.me/${telefoneDono}?text=${mensagem}`, "_blank");
  };

  return (
    <div className="sucesso-container">
      <div className="sucesso-card">
        <div className="icon-box">
          <FaCheckCircle className="check-icon" />
        </div>
        
        <h1>Pedido Recebido!</h1>
        <p>
          Obrigado por escolher o <strong>Ninja Burger</strong>. 
          Seu pedido <strong>#{orderId}</strong> já está sendo preparado.
        </p>

        <div className="info-box">
          <span>O que acontece agora?</span>
          <ul>
            <li>Você receberá notificações automáticas no seu WhatsApp.</li>
            <li>O tempo estimado de entrega é de 30-50 min.</li>
            <li>Fique de olho no seu celular! 📱</li>
          </ul>
        </div>

        <div className="actions-sucesso">
          <button 
            className="btn-whatsapp" 
            onClick={handleOpenWhatsapp}
          >
            <FaWhatsapp /> Falar com Atendente
          </button>
          
          <button className="btn-voltar" onClick={() => navigate("/")}>
            <FaArrowLeft /> Fazer outro pedido
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sucesso;