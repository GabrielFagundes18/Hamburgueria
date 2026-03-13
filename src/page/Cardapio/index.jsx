import React, { useState, useEffect } from "react";
import axios from "axios";
import Cart from "../../components/Cart";
import { FaCartPlus ,FaReply } from "react-icons/fa";
import "./style.css";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
const Cardapio = () => {
  const [produtos, setProdutos] = useState([]);
  const [categoria, setCategoria] = useState("todos");
  const [carrinho, setCarrinho] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [cliente, setCliente] = useState({ nome: "", whatsapp: "" });
const navigate = useNavigate()
  useEffect(() => {
    const carregarDados = async () => {
      try {
        const url =
          categoria === "todos"
            ? "https://backend-hamburgueria.onrender.com/products"
            : `https://backend-hamburgueria.onrender.com/products?category=${categoria}`;

        const res = await axios.get(url);
        setProdutos(res.data);
      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
      }
    };
    carregarDados();
  }, [categoria]);

  const adicionarAoCarrinho = (p) => {
    const existe = carrinho.find((item) => item.id === p.id);
    if (existe) {
      setCarrinho(
        carrinho.map((item) =>
          item.id === p.id ? { ...item, quantity: item.quantity + 1 } : item,
        ),
      );
    } else {
      setCarrinho([...carrinho, { ...p, quantity: 1 }]);
    }
    setIsCartOpen(true);
  };

  const removerDoCarrinho = (id) =>
    setCarrinho(carrinho.filter((item) => item.id !== id));

  const total = carrinho.reduce(
    (acc, item) => acc + parseFloat(item.price) * item.quantity,
    0,
  );

const finalizarPedido = async (e) => {
  e.preventDefault();

  const pedido = {
    customer_name: cliente.nome,      
    customer_whatsapp: cliente.whatsapp, 
    total_price: total,              
    items: carrinho.map(item => ({
      product_id: item.id,            
      quantity: item.quantity,        
      price: item.price               
    }))
  };
const loadingToast = toast.loading('Enviando seu pedido para a cozinha...');
  try {
   
    await axios.post("https://backend-hamburgueria.onrender.com/orders", pedido);
    toast.success('🔥 Pedido Ninja realizado com sucesso!', {
      id: loadingToast,
      duration: 4000,
      style: {
        background: '#1a1a1a',
        color: '#00ff88',
        border: '1px solid #00ff88',
      },
    });
    setCarrinho([]);
    setShowModal(false);
  } catch (err) {
    console.error("Erro no envio:", err.response?.data);
    toast.error('❌ Erro ao enviar pedido. Tente novamente.', {
      id: loadingToast,
      style: {
        background: '#1a1a1a',
        color: '#ff4d4d',
        border: '1px solid #ff4d4d',
      },
    });}
};
  return (
    <div className="cardapio-page">
    <header className="main-header">  
      <button className="cart-voltar" onClick={() => navigate("/")}> <FaReply /> </button>
      
        <h1>
          Ninja <span>Burger</span>
        </h1>
        <button className="cart-toggle" onClick={() => setIsCartOpen(true)}>
         <FaCartPlus />  <span>{carrinho.length}</span>
        </button>
      </header>

      <nav className="filter-nav">
        {[
          "todos",
          "Hambúrgueres",
          "Combo",
          "Bebidas",
          "Acompanhamentos",
          "Sobremesas",
        ].map((cat) => (
          <button
            key={cat}
            className={categoria === cat ? "active" : ""}
            onClick={() => setCategoria(cat)}
          >
            {cat}
          </button>
        ))}
      </nav>

      <div className="product-grid">
        {produtos.map((item) => (
          <div key={item.id} className="product-card">
            <img
              src={
                item.image_url ||
                "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=400"
              }
              alt={item.name}
            />
            <div className="product-details">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <div className="product-footer">
                <span>R$ {parseFloat(item.price).toFixed(2)}</span>
                <button onClick={() => adicionarAoCarrinho(item)}>+</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={carrinho}
        onRemove={removerDoCarrinho}
        total={total}
        onFinalize={() => {
          setIsCartOpen(false);
          setShowModal(true);
        }}
      />

      
      {showModal && (
        <div className="modal-overlay">
          <form className="modal-form" onSubmit={finalizarPedido}>
            <h2>Finalizar Pedido</h2>
            <input
              type="text"
              placeholder="Seu Nome"
              required
              value={cliente.nome}
              onChange={(e) => setCliente({ ...cliente, nome: e.target.value })}
            />
            <input
              type="text"
              placeholder="WhatsApp"
              required
              value={cliente.whatsapp}
              onChange={(e) =>
                setCliente({ ...cliente, whatsapp: e.target.value })
              }
            />
            <div className="modal-btns">
              <button type="button" onClick={() => setShowModal(false)}>
                Voltar
              </button>
              <button type="submit" className="confirm">
                Confirmar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Cardapio;
