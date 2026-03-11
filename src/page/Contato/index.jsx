import './style.css';
import { useState, useEffect } from 'react';

const Contato = () => {

const checkIsOpen = () => {
  const agora = new Date();
  const diaSemana = agora.getDay(); // 0 (Dom) a 6 (Sab)
  const horaAtual = agora.getHours();
  const minutosAtuais = agora.getMinutes();
  
  // Transformar tudo em minutos para facilitar a conta (ex: 18:30 = 1110 min)
  const tempoAtual = horaAtual * 60 + minutosAtuais;
  const abertura = 18 * 60; // 18:00
  
  // Segunda-feira (1) o restaurante fecha
  if (diaSemana === 1) return false;

  // Sexta (5), Sábado (6) e Domingo (0) fecha à meia-noite (24:00)
  if (diaSemana === 5 || diaSemana === 6 || diaSemana === 0) {
    const fechamentoFimDeSemana = 24 * 60;
    return tempoAtual >= abertura && tempoAtual < fechamentoFimDeSemana;
  }

  // Terça, Quarta e Quinta fecha às 23:00
  const fechamentoSemana = 23 * 60;
  return tempoAtual >= abertura && tempoAtual < fechamentoSemana;
};

const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(checkIsOpen());
    
    // Opcional: Atualizar a cada 1 minuto sem recarregar a página
    const interval = setInterval(() => {
      setIsOpen(checkIsOpen());
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);



  return (
    <section className="contato-section" id='contato'>
      <div className="contato-container">
        
        {/* Lado Esquerdo: Informações */}
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
            {isOpen ? (
        <span className="status-open">Aberto Agora</span>
      ) : (
        <span className="status-closed">Fechado Agora</span>
      )}
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