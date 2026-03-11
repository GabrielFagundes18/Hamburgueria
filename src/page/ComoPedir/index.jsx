import { FaHamburger, FaShoppingCart, FaMotorcycle } from "react-icons/fa";
import "./style.css";

const ComoPedir = () => {
  return (
    <section className="como-pedir" id="comoPedir">

      <div className="como-header">
        <h2>Como <span>Pedir</span></h2>
        <p>Peça seu Ninja Burger em poucos passos</p>
      </div>

      <div className="passos">

        <div className="passo">
          <div className="icon">
            <FaHamburger />
          </div>

          <h3>Escolha seu Burger</h3>
          <p>Explore nosso cardápio e escolha o hambúrguer perfeito.</p>
        </div>

        <div className="linha"></div>

        <div className="passo">
          <div className="icon">
            <FaShoppingCart />
          </div>

          <h3>Faça o Pedido</h3>
          <p>Peça pelo site ou WhatsApp de forma rápida.</p>
        </div>

        <div className="linha"></div>

        <div className="passo">
          <div className="icon">
            <FaMotorcycle />
          </div>

          <h3>Receba em Casa</h3>
          <p>Entregamos seu burger quentinho na sua porta.</p>
        </div>

      </div>

    </section>
  );
};

export default ComoPedir;