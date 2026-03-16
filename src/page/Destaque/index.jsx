import React from "react";
import "./style.css";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

const Destaque = () => {
  // Usei os nomes (name, category, image_url) para padronizar com seu Backend
  const produtos = [
    {
      id: 1,
      name: "Ninja Smash Duplo",
      category: "Hambúrgueres",
      image_url:
        "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=500&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Coca-Cola Gelada",
      category: "Bebidas",
      image_url:
        "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=500&auto=format&fit=crop",
    },
    {
  id: 3,
  name: "Batata Frita Ninja",
  category: "Acompanhamentos",
  image_url: "https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=500"
},
    {
      id: 4,
      name: "Combo Shogun",
      category: "Combo",
      image_url:
        "https://images.unsplash.com/photo-1610614819513-58e34989848b?q=80&w=500&auto=format&fit=crop",
    },
  ];

  const navigate = useNavigate();

  return (
    <section className="menu-destaque" id="menu">
      <div className="menu-header">
        <h2 className="tag">Destaques do Cardápio</h2>
        <p>Os burgers mais pedidos da casa</p>
      </div>

      <div className="menu-grid">
        {produtos.map((item) => (
          <div className="menu-card" key={item.id}>
            <img src={item.image_url} alt={item.name} />

            <div className="overlay">
              <h3>{item.category}</h3>
              <Button variant="primary" onClick={() => navigate("/cardapio")}>
                Ir para Cardápio
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Destaque;
