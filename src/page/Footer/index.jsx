import "./style.css";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        <div className="footer-brand">
          <h2 className="footer-logo">NINJA<span>BURGER</span></h2>
          <p className="brand-pitch">
            A arte do burger na velocidade de um ninja. Qualidade e sabor em cada movimento.
          </p>
          <div className="social-icons">
            <a href="#g" className="social-btn instagram"><FaInstagram/></a>
            <a href="#g" className="social-btn facebook"><FaFacebookF/></a>
            <a href="#h" className="social-btn whatsapp"><FaWhatsapp/></a>
          </div>
        </div>

        <div className="footer-group">
          <h4>Navegação</h4>
          <nav className="footer-nav">
            <a href="#Hero">Home</a>
            <a href="#menu">Menu</a>
            <a href="#Sobre">Sobre</a>
            <a href="#contato">Contato</a>
          </nav>
        </div>

       
        <div className="footer-group">
          <h4>Atendimento</h4>
          <ul className="contact-list">
            <li><FaMapMarkerAlt /> Rua dos Burgers, 123 - SP</li>
            <li><FaPhoneAlt /> (11) 99999-9999</li>
            <li><FaEnvelope /> contato@ninjaburger.com</li>
          </ul>
        </div>

       
        <div className="footer-group">
          <h4>Horários</h4>
          <div className="opening-hours">
            <p>Ter - Qui: <span>18:00 - 23:00</span></p>
            <p>Sex - Dom: <span>18:00 - 00:00</span></p>
            <p className="closed-day">Segunda: Fechado</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Ninja Burger. Desenvolvido com foco em alta performance.</p>
      </div>
    </footer>
  );
};

export default Footer;