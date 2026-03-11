import React from 'react';
import './style.css'
import Button from '../../components/Button';
const Destaque = () => {

  const produtos = [
    {
      id: 1,
      nome: "Burger Clássico",
      categoria: "Hambúrguer",
      img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd"
    },
    {
      id: 2,
      nome: "Cheddar Bacon",
      categoria: "Bebidas",
      img: "https://images.unsplash.com/photo-1550547660-d9450f859349"
    },
    {
      id: 3,
      nome: "Burger Especial",
      categoria: "Complementos",
      img: "https://images.unsplash.com/photo-1606755962773-d324e2d53c72"
    }
  ];

  return (
    <section className="menu-destaque" id='menu'>
      <div className="menu-header">
        <h2 className='tag'> Destaques do Cardápio</h2>
        <p>Os burgers mais pedidos da casa</p>
      </div>

      <div className="menu-grid">
        {produtos.map((item) => (
          <div className="menu-card" key={item.id}>

            <img src={item.img} alt={item.nome} />

            <div className="overlay">
              <h3>{item.categoria}</h3>
               <Button variant="primary" onClick={() => window.location.href = "/menu"}>
    Ir para Cardápio
  </Button>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}

export default Destaque;