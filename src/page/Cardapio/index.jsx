import React, { useState, useEffect } from "react";
import axios from "axios";
import Cart from "../../components/Cart";
import "./style.css";

const Cardapio = () => {
  const [produtos, setProdutos] = useState([]);
  const [categoria, setCategoria] = useState("todos");
  const [carrinho, setCarrinho] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [cliente, setCliente] = useState({ nome: "", whatsapp: "" });

  // 1. Puxar do Banco (Ajustado para bater na rota /menu/products)
  useEffect(() => {
    const carregarDados = async () => {
      try {
        const url = categoria === 'todos' 
          ? 'http://localhost:5000/menu/products' 
          : `http://localhost:5000/menu/products?category=${categoria}`;
          
        const res = await axios.get(url);
        setProdutos(res.data);
      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
      }
    };
    carregarDados();
  }, [categoria]);

  // 2. Adicionar ao Carrinho
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

  // 3. Cálculo do Total (Ajustado para garantir que o preço seja número)
  const total = carrinho.reduce(
    (acc, item) => acc + parseFloat(item.price) * item.quantity,
    0,
  );

  // 4. Finalizar Pedido (Ajustado para a rota /orders)
  const finalizarPedido = async (e) => {
    e.preventDefault();

    const pedido = {
      customer_name: cliente.nome,
      customer_whatsapp: cliente.whatsapp,
      // Mapeia para o que o seu backend espera (product_id)
      items: carrinho.map(item => ({
        product_id: item.id, 
        quantity: item.quantity
      }))
    };

    try {
      // Ajustado para http://localhost:5000/orders conforme seu server.js
      await axios.post("http://localhost:5000/orders", pedido);
      alert("🔥 Pedido Ninja realizado com sucesso!");
      setCarrinho([]);
      setShowModal(false);
    } catch (err) {
      console.error("Erro no envio:", err.response?.data);
      alert("Erro ao enviar pedido. Verifique o console.");
    }
  };

  return (
    <div className="cardapio-page">
      <header className="main-header">
        <h1>Ninja <span>Burger</span></h1>
        <button className="cart-toggle" onClick={() => setIsCartOpen(true)}>
          🛒 <span>{carrinho.length}</span>
        </button>
      </header>

      <nav className="filter-nav">
        {["todos", "Hambúrgueres", "Combo", "Bebidas","Acompanhamentos","Sobremesas"].map((cat) => (
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
            <img src={item.image_url || "https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=400"} alt={item.name} />
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

      {/* 5. Renderização do Carrinho */}
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

      {/* 6. Modal de Finalização (Renderização Condicional Corrigida) */}
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
              onChange={(e) => setCliente({ ...cliente, whatsapp: e.target.value })}
            />
            <div className="modal-btns">
              <button type="button" onClick={() => setShowModal(false)}>Voltar</button>
              <button type="submit" className="confirm">Confirmar</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Cardapio;