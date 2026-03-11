import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./style.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="logo">
        NINJA<span>BURGER</span>
      </div>

      <nav className={menuOpen ? "nav active" : "nav"}>
        <a href="#Hero">Home</a>
        <a href="#menu">Menu</a>
        <a href="#Sobre">Sobre</a>
        <a href="#comoPedir">Como Pedir</a>
        <a href="#galeria">Galeria</a>
        <a href="#contato">Contato</a>
      </nav>

      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </header>
  );
};

export default Header;
