import "./style.css";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Logo */}
        <div className="footer-logo">
          NINJA<span>BURGER</span>
        </div>

        {/* Links Rápidos */}
        <div className="footer-links">
          <h4>Links Rápidos</h4>
          <a href="#Hero">Home</a>
        <a href="#menu">Menu</a>
        <a href="#Sobre">Sobre</a>
        <a href="#comoPedir">Como Pedir</a>
        <a href="#galeria">Galeria</a>
        <a href="#contato">Contato</a>
        </div>

        {/* Contato */}
        <div className="footer-contato">
          <h4>Contato</h4>
          <p>Rua dos Burgers, 123 - São Paulo, SP</p>
          <p>Telefone: (11) 99999-9999</p>
          <p>Email: contato@ninjaburger.com</p>
        </div>

        {/* Redes sociais */}
        <div className="footer-social">
          <h4>Siga-nos</h4>
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaWhatsapp /></a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Ninja Burger. Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;