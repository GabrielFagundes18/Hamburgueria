import "./style.css";
import bannerImg from "../../assets/bannerImg.jpg";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";


const Hero = () => {
  const navigate = useNavigate()
  return (
    <section className="hero" id="Hero" style={{ backgroundImage: `url(${bannerImg})` }}>
  
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>
            NINJA<span>BURGER</span>
          </h1>
          <h3>O hambúrguer que ataca sua fome nas sombras da noite.</h3>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
            at molestiae illo nostrum itaque quis corrupti voluptatibus labore
            incidunt! Ipsa rem saepe sit vero ratione! Nostrum quas deleniti
            voluptate ratione?
          </p>
         <Button variant="primary" onClick={() => navigate('/cardapio')}>
  Fazer Pedido
</Button>
        </div>
      </div>
      
    </section>
   
  );
};

export default Hero;
