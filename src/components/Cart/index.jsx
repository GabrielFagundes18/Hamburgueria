import React from 'react';
import { CiCircleRemove } from "react-icons/ci";
import { FaShoppingBasket, FaMotorcycle, FaArrowRight } from "react-icons/fa";
import "./styles.css";

const Cart = ({ items, onRemove, total, onFinalize }) => {
  return (
    <aside className="cart-sidebar">
      {/* HEADER: Fixado no topo */}
      <div className="cart-header">
        <h2>
          <FaShoppingBasket className="cart-icon" /> 
          Meu <span>Pedido</span>
        </h2>
        <span className="item-count">{items.length} itens</span>
      </div>

      {/* BODY: Área com scroll para os itens */}
      <div className="cart-body">
        {items.length === 0 ? (
          <div className="empty-cart-container">
            <div className="empty-icon">🍔</div>
            <p>Sua mochila está vazia!</p>
            <span>Adicione algo do cardápio para começar.</span>
          </div>
        ) : (
          <div className="cart-items-list">
            {items.map((item) => (
              <div key={item.id} className="cart-item-card">
                <div className="item-img-wrapper">
                  <img src={item.image_url} alt={item.name} />
                </div>
                
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <div className="item-price-info">
                    <span className="qty">{item.quantity}x</span>
                    <span className="unit-price">R$ {parseFloat(item.price).toFixed(2)}</span>
                  </div>
                </div>

                <button 
                  onClick={() => onRemove(item.id)} 
                  className="btn-remove-item"
                  aria-label="Remover item"
                >
                  <CiCircleRemove />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FOOTER: Fixado na base, com resumo e checkout */}
      <div className="cart-footer">
        <div className="order-summary">
          <div className="summary-row">
            <span>Subtotal</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>
          <div className="summary-row delivery">
            <span><FaMotorcycle /> Entrega</span>
            <span className="free-tag">Grátis</span>
          </div>
          <div className="summary-row total-row">
            <strong>Total</strong>
            <strong>R$ {total.toFixed(2)}</strong>
          </div>
        </div>

        <button 
          className="btn-checkout-ninja" 
          disabled={items.length === 0}
          onClick={onFinalize}
        >
          <span>Finalizar Pedido</span>
          <FaArrowRight />
        </button>
      </div>
    </aside>
  );
};

export default Cart;