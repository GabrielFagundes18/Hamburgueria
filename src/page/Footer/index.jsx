import "./style.css";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          NINJA<span>BURGER</span>
        </div>

        <div className="footer-links">
          <h4>Links Rápidos</h4>
          <a href="#Hero">Home</a>
          <a href="#menu">Menu</a>
          <a href="#Sobre">Sobre</a>
          <a href="#comoPedir">Como Pedir</a>
          <a href="#galeria">Galeria</a>
          <a href="#contato">Contato</a>
        </div>

      
        <div className="footer-contato">
          <h4>Contato</h4>
          <p>Rua dos Burgers, 123 - São Paulo, SP</p>
          <p>Telefone: (11) 99999-9999</p>
          <p>Email: contato@ninjaburger.com</p>
        </div>

        <div className="footer-social">
          <h4>Siga-nos</h4>
          <div className="social-icons">
            <button
              onClick={() => alert("Link do Instagram ainda não disponível")}
            >
              <FaInstagram/>
            </button>
            <button
              onClick={() => alert("Link do Facebook ainda não disponível")}
            >
                <FaFacebookF/>
            </button>
            <button
              onClick={() => alert("Link do WhatsApp ainda não disponível")}
            >
              <FaWhatsapp/>
            </button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Ninja Burger. Todos os direitos
        reservados.
      </div>
    </footer>
  );
};

export default Footer;
