import React from 'react';
import './style.css';

const Cart = ({ isOpen, onClose, items, onRemove, total, onFinalize }) => {
  return (
    <>
      {isOpen && <div className="cart-overlay" onClick={onClose}></div>}
      <aside className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Meu Pedido</h2>
          <button className="close-cart" onClick={onClose}>&times;</button>
        </div>

        <div className="cart-body">
          {items.length === 0 ? (
            <p className="empty-msg">O carrinho está vazio.</p>
          ) : (
            items.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image_url} alt={item.name} />
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <span>{item.quantity}x R$ {parseFloat(item.price).toFixed(2)}</span>
                </div>
                <button onClick={() => onRemove(item.id)} className="btn-remove">🗑️</button>
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
    </>
  );
};

export default Cart;