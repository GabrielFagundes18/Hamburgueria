import React, { useState, useEffect } from "react";
import axios from "axios";
import Cart from "../../components/Cart";
import { FaReply, FaSpinner, FaPlus, FaMinus } from "react-icons/fa";
import "./style.css";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const Cardapio = () => {
  const [produtos, setProdutos] = useState([]);
  const [categoria, setCategoria] = useState("todos");
  const [carrinho, setCarrinho] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  // Lista de bairros que você atende (Ajuste conforme sua necessidade)
  const BAIRROS_ATENDIDOS = ["Centro", "Vila Olimpia", "Jardins", "Moema", "Itaim Bibi", "Brooklin"];
  const [entregaPermitida, setEntregaPermitida] = useState(true);

  const [cliente, setCliente] = useState({ 
    nome: "", whatsapp: "", cep: "", endereco: "", bairro: "", numero: "", pagamento: "Cartão" 
  });

  const navigate = useNavigate();

  // Carregar produtos da API
  useEffect(() => {
    const carregarDados = async () => {
      setLoading(true);
      try {
        const url = categoria === "todos"
          ? "https://backend-hamburgueria.onrender.com/products"
          : `https://backend-hamburgueria.onrender.com/products?category=${categoria}`;
        const res = await axios.get(url);
        setProdutos(res.data);
      } catch (err) {
        toast.error("Erro ao conectar com o servidor.");
      } finally {
        setLoading(false);
      }
    };
    carregarDados();
  }, [categoria]);

  // Função para adicionar ao carrinho (Corrigida contra alertas duplos)
  const adicionarAoCarrinho = (p) => {
    const jaExiste = carrinho.some(item => item.id === p.id);
    
    setCarrinho(prev => {
      const existe = prev.find(item => item.id === p.id);
      if (existe) {
        return prev.map(item => item.id === p.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...p, quantity: 1 }];
    });

    if (!jaExiste) {
      toast.dismiss(); // Remove o alerta anterior
      toast.success(`${p.name} adicionado!`, { icon: '🍔', duration: 1000 });
    }
  };

  const removerUmItem = (id) => {
    setCarrinho(prev => {
      const item = prev.find(i => i.id === id);
      if (item?.quantity > 1) {
        return prev.map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i);
      }
      return prev.filter(i => i.id !== id);
    });
  };

  const removerTudoDoItem = (id) => setCarrinho(prev => prev.filter(i => i.id !== id));

  const total = carrinho.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0);

  // Busca de CEP Automática
  const handleCEPChange = async (e) => {
    const valor = e.target.value.replace(/\D/g, "");
    setCliente({ ...cliente, cep: valor });

    if (valor.length === 8) {
      const loadCep = toast.loading("Ninja buscando endereço...");
      try {
        const res = await axios.get(`https://viacep.com.br/ws/${valor}/json/`);
        
        if (res.data.erro) {
          toast.error("CEP não encontrado!", { id: loadCep });
          return;
        }

        const { logradouro, bairro } = res.data;
        // Verifica se o bairro está na lista (ignora maiúsculas/minúsculas)
        const atende = BAIRROS_ATENDIDOS.some(b => b.toLowerCase() === bairro.toLowerCase());

        setCliente(prev => ({ ...prev, endereco: logradouro, bairro: bairro }));
        setEntregaPermitida(atende);

        if (!atende) {
          toast.error("O mestre ninja não entrega neste bairro!", { id: loadCep, duration: 4000 });
        } else {
          toast.success("Endereço localizado!", { id: loadCep });
        }
      } catch (err) {
        toast.error("Erro ao buscar CEP.", { id: loadCep });
      }
    }
  };

  const finalizarPedido = async (e) => {
    e.preventDefault();
    if (!entregaPermitida) return toast.error("Área de entrega não permitida.");

    const pedido = {
      customer_name: cliente.nome,
      customer_whatsapp: cliente.whatsapp,
      address: `${cliente.endereco}, ${cliente.numero} - ${cliente.bairro}`,
      payment_method: cliente.pagamento,
      total_price: total,
      items: carrinho.map(item => ({ product_id: item.id, quantity: item.quantity, price: item.price }))
    };

    const loadingToast = toast.loading('Enviando para a cozinha...');
    try {
      await axios.post("https://backend-hamburgueria.onrender.com/orders", pedido);
      toast.success('🔥 Pedido realizado!', { id: loadingToast });
      setCarrinho([]);
      setShowModal(false);
      setCliente({ nome: "", whatsapp: "", cep: "", endereco: "", bairro: "", numero: "", pagamento: "Cartão" });
    } catch (err) {
      toast.error('❌ Erro no envio.', { id: loadingToast });
    }
  };

  return (
    <div className="cardapio-page">
      <header className="main-header">
        <button className="cart-voltar" onClick={() => navigate("/")}> <FaReply /> </button>
        <h1 className="logo">Ninja <span>Burger</span></h1>
        <div className="cart-status"><span className="online-dot"></span> Aberto</div>
      </header>

      <div className="cardapio-container">
        <main className="products-section">
          <nav className="filter-nav">
            {["todos", "Hambúrgueres", "Combo", "Bebidas", "Acompanhamentos"].map((cat) => (
              <button key={cat} className={categoria === cat ? "active" : ""} onClick={() => setCategoria(cat)}>
                {cat}
              </button>
            ))}
          </nav>

          {loading ? (
            <div className="loading-container"><FaSpinner className="spinner" /><p>Carregando...</p></div>
          ) : (
            <div className="product-grid">
              {produtos.map((item) => {
                const itemNoCarrinho = carrinho.find(c => c.id === item.id);
                return (
                  <div key={item.id} className="product-card">
                    <img src={item.image_url} alt={item.name} />
                    <div className="product-details">
                      <h3>{item.name}</h3>
                      <p>{item.description}</p>
                      <div className="product-footer">
                        <span className="price">R$ {parseFloat(item.price).toFixed(2)}</span>
                        {itemNoCarrinho ? (
                          <div className="quantity-control-card">
                            <button onClick={() => removerUmItem(item.id)}><FaMinus /></button>
                            <span>{itemNoCarrinho.quantity}</span>
                            <button onClick={() => adicionarAoCarrinho(item)}><FaPlus /></button>
                          </div>
                        ) : (
                          <button className="add-btn" onClick={() => adicionarAoCarrinho(item)}><FaPlus /></button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>

        <Cart items={carrinho} onRemove={removerTudoDoItem} total={total} onFinalize={() => setShowModal(true)} />
      </div>

      {showModal && (
        <div className="modal-overlay">
          <form className="modal-form" onSubmit={finalizarPedido}>
            <h2>Finalizar Pedido</h2>
            <div className="modal-body">
              <input type="text" placeholder="Nome" required value={cliente.nome} onChange={(e) => setCliente({ ...cliente, nome: e.target.value })} />
              <input type="text" placeholder="WhatsApp" required value={cliente.whatsapp} onChange={(e) => setCliente({ ...cliente, whatsapp: e.target.value })} />
              
              <input type="text" placeholder="Seu CEP (Apenas números)" required maxLength="8" value={cliente.cep} onChange={handleCEPChange} />
              
              <input type="text" placeholder="Endereço" required value={cliente.endereco} readOnly className="readonly-input" />
              
              <div className="input-group">
                <input type="text" placeholder="Nº" required value={cliente.numero} onChange={(e) => setCliente({ ...cliente, numero: e.target.value })} />
                <input type="text" placeholder="Bairro" required value={cliente.bairro} readOnly className="readonly-input" />
              </div>

              {!entregaPermitida && <p className="delivery-error">❌ Desculpe, não entregamos neste bairro.</p>}

              <select value={cliente.pagamento} onChange={(e) => setCliente({...cliente, pagamento: e.target.value})}>
                <option value="Cartão">Cartão</option>
                <option value="Pix">Pix</option>
                <option value="Dinheiro">Dinheiro</option>
              </select>
            </div>

            <div className="modal-btns">
              <button type="button" onClick={() => setShowModal(false)}>Voltar</button>
              <button type="submit" className="confirm" disabled={!entregaPermitida}>Confirmar</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Cardapio;