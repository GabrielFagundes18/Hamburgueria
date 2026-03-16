import React from 'react';

import { CiCircleRemove } from "react-icons/ci";

const Cart = ({ items, onRemove, total, onFinalize }) => {
  return (
    <aside className="cart-sidebar-integrated">
      <div className="cart-header-integrated">
        <h2>Meu Pedido</h2>
      </div>

      <div className="cart-body">
        {items.length === 0 ? (
          <div className="empty-msg-container">
            <p className="empty-msg">Seu carrinho está vazio.</p>
          </div>
        ) : (
          items.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image_url} alt={item.name} />
              <div className="item-info">
                <h4>{item.name}</h4>
                <span>{item.quantity}x R$ {parseFloat(item.price).toFixed(2)}</span>
              </div>
              <button onClick={() => onRemove(item.id)} className="btn-remove">
                <CiCircleRemove />
              </button>
            </div>
          ))
        )}
      </div>

      <div className="cart-footer">
        <div className="total">
          <span>Total:</span>
          <span>R$ {total.toFixed(2)}</span>
        </div>
        <button 
          className="btn-checkout" 
          disabled={items.length === 0}
          onClick={onFinalize}
        >
          Finalizar Pedido
        </button>
      </div>
    </aside>
  );
};

export default Cart;