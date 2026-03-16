import StatusLoja from '../../components/StatusLoja';
import './style.css';
import { useState, useEffect } from 'react';

const Contato = () => {

  return (
    <section className="contato-section" id='contato'>
      <div className="contato-container">
        
        <div className="info-box">
          <h2>Onde Estamos 📍</h2>
          
          <div className="info-item">
            <h3>Endereço</h3>
            <p>Rua dos Ninjas, 123 - Centro</p>
            <p>Guarulhos, SP - CEP 07000-000</p>
          </div>

          <div className="info-item">
            <h3>Horário de Funcionamento</h3>
            <p>Terça a Quinta: 18:00 - 23:00</p>
            <p>Sexta a Domingo: 18:00 - 00:00</p>
            <StatusLoja/>
          </div>

          <div className="info-item">
            <h3>Contatos</h3>
            <p>📞 (11) 99999-9999</p>
            <p>✉️ contato@ninjaburger.com.br</p>
          </div>
        </div>

        {/* Lado Direito: Mapa (Google Maps Embed) */}
        <div className="map-box">
          <iframe 
            title="Mapa Ninja Burger"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3659.025442542173!2d-46.526839!3d-23.46!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cef538ed6b8761%3A0xc6c421714856f7b1!2sGuarulhos%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1710000000000!5m2!1spt-BR!2sbr" 
            width="100%" 
            height="100%" 
            style={{ border: 0, borderRadius: '20px' }} 
            allowFullScreen="" 
            loading="lazy"
          ></iframe>
        </div>

      </div>
    </section>
  );
};

export default Contato;