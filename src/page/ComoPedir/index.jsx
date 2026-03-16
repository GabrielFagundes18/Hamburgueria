import { FaUtensils, FaCreditCard, FaHotjar } from "react-icons/fa";
import "./style.css";

const ComoPedir = () => {
  const fluxoVenda = [
    {
      id: 1,
      icon: <FaUtensils />,
      titulo: "Vá ao Cardápio",
      desc: "Navegue pelas categorias e selecione seus burgers clicando no ícone de adicionar.",
    },
    {
      id: 2,
      icon: <FaCreditCard />,
      titulo: "Finalize Online",
      desc: "Confira seu carrinho, preencha os dados de entrega.",
    },
    {
      id: 3,
      icon: <FaHotjar />,
      titulo: "Aguarde a Entrega",
      desc: "Seu pedido entra em produção na hora! Prepare a mesa que estamos chegando.",
    },
  ];

  return (
    <section className="como-pedir" id="comoPedir">
      <div className="como-header">
        <h2>
          Pedido <span>Online</span>
        </h2>
        <p>A experiência Ninja completa em apenas 3 passos</p>
      </div>

      <div className="passos">
        {fluxoVenda.map((item, index) => (
          <div key={item.id} className="passo-item-container">
            <div className="passo">
              <div className="icon" aria-hidden="true">
                {item.icon}
              </div>
              <h3>{item.titulo}</h3>
              <p>{item.desc}</p>
            </div>
            
            {/* Linha conectora entre os cards */}
            {index < fluxoVenda.length - 1 && (
              <div className="linha" aria-hidden="true"></div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ComoPedir;