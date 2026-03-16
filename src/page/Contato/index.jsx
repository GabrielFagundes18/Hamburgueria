import React from "react";
import StatusLoja from "../../components/StatusLoja";
import "./style.css";

const Contato = () => {
  return (
    <section className="contato-section" id="contato">
      <div className="contato-header">
        <span className="tag">
          <i className="bi bi-send-fill me-2"></i> Base Secreta
        </span>

        <p>
          Localize nossa base no radar ou entre em contato pela linha direta.
        </p>
      </div>

      <div className="contato-wrapper">
        <div className="glass-card-grid">
          <div className="info-card">
            <div className="card-icon">
              <i className="bi bi-geo-alt"></i>
            </div>
            <h3>Coordenadas</h3>
            <p>Rua dos Ninjas, 123</p>
            <p>Guarulhos, SP</p>
            <span className="card-detail">Centro Operacional</span>
          </div>

          <div className="info-card">
            <div className="card-icon">
              <i className="bi bi-lightning-charge"></i>
            </div>
            <h3>Radar de Operação</h3>
            <p>Ter a Qui: 18h — 23h</p>
            <p>Sex a Dom: 18h — 00h</p>
            <div className="status-badge">
              <StatusLoja />
            </div>
          </div>

          <div className="info-card">
            <div className="card-icon">
              <i className="bi bi-chat-dots"></i>
            </div>
            <h3>Linha Direta</h3>
            <p>(11) 99999-9999</p>
            <p className="email-text">contato@ninjaburger.com.br</p>
            <button className="btn-zap">
              <i className="bi bi-whatsapp me-2"></i> Chamar no Whats
            </button>
          </div>
        </div>

        <div className="map-container">
          <div className="map-glow"></div>
          <iframe
            title="Mapa Ninja Burger"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58543.08581678853!2d-46.564531851367175!3d-23.417431199999993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce8a8d79361685%3A0xc608d4d849480119!2sGuarulhos%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1710500000000!5m2!1spt-BR!2sbr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contato;
