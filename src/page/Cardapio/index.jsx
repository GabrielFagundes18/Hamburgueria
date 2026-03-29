import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { API } from "../../api/api.js";
import Cart from "../../components/Cart";
import {
  FaSpinner,
  FaPlus,
  FaMinus,
  FaSearch,
  FaUtensils,
  FaArrowLeft,
  FaCheckCircle,
  FaTimes,
} from "react-icons/fa";
import "./style.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Cardapio = () => {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [categoria, setCategoria] = useState("todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [carrinho, setCarrinho] = useState(() => {
    const saved = localStorage.getItem("@NinjaBurger:cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [cliente, setCliente] = useState({
    nome: "",
    whatsapp: "",
    cep: "",
    endereco: "",
    bairro: "",
    numero: "",
    complemento: "",
    pagamento: "",
    observacao: "",
    troco: "",
  });

  useEffect(() => {
    localStorage.setItem("@NinjaBurger:cart", JSON.stringify(carrinho));
  }, [carrinho]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await API.get("/products");
        setProdutos(data);
      } catch (err) {
        toast.error("Erro ao carregar cardápio.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const categorias = useMemo(
    () => ["todos", ...new Set(produtos.map((p) => p.category))],
    [produtos],
  );

  const produtosFiltrados = useMemo(() => {
    const termo = searchTerm.toLowerCase();
    return produtos.filter(
      (p) =>
        (categoria === "todos" || p.category === categoria) &&
        (p.name?.toLowerCase().includes(termo) ||
          p.description?.toLowerCase().includes(termo)),
    );
  }, [produtos, categoria, searchTerm]);

  const subtotal = useMemo(
    () => carrinho.reduce((acc, i) => acc + Number(i.price) * i.quantity, 0),
    [carrinho],
  );

  const handleCartAction = (product, action) => {
    setCarrinho((prev) => {
      const itemExists = prev.find((item) => item.id === product.id);
      if (action === "add") {
        if (itemExists) {
          return prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
        }
        return [...prev, { ...product, quantity: 1 }];
      }
      if (action === "remove" && itemExists) {
        if (itemExists.quantity > 1) {
          return prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          );
        }
        return prev.filter((item) => item.id !== product.id);
      }
      return prev;
    });
  };

  const handleCEP = async (cep) => {
    const valor = cep.replace(/\D/g, "");
    setCliente((prev) => ({ ...prev, cep: valor }));
    if (valor.length === 8) {
      try {
        const { data } = await axios.get(
          `https://viacep.com.br/ws/${valor}/json/`,
        );
        if (data.erro) return toast.error("CEP inválido.");

        setCliente((prev) => ({
          ...prev,
          endereco: data.logradouro,
          bairro: data.bairro,
        }));
      } catch {
        toast.error("Erro ao buscar CEP.");
      }
    }
  };

  const finalizarPedido = async (e) => {
    e.preventDefault();
    if (carrinho.length === 0) return toast.error("Seu carrinho está vazio!");
    setSending(true);

    const payload = {
      type: "website",
      customer_name: cliente.nome,
      customer_whatsapp: cliente.whatsapp,
      total_price: subtotal,
      cep: cliente.cep,
      address_street: cliente.endereco,
      address_number: cliente.numero,
      address_complement: cliente.complemento,
      address_neighborhood: cliente.bairro,
      payment_method: cliente.pagamento,
      change_details: cliente.troco,
      notes: cliente.observacao || "Sem observações",
      items: carrinho.map((i) => ({
        product_id: i.id,
        quantity: i.quantity,
        price: Number(i.price),
      })),
    };

    try {
      
      await API.post("/orders/checkout", payload);
      toast.success("Pedido enviado com sucesso!");
      setCarrinho([]);
      localStorage.removeItem("@NinjaBurger:cart");
      setShowModal(false);
      navigate("/sucesso");
    } catch {
      toast.error("Erro ao processar pedido.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="cardapio-container">
      <header className="navbar">
        <div className="nav-content">
          <button className="btn-back" onClick={() => navigate("/")}>
            <FaArrowLeft />
          </button>
          <div className="brand">
            <FaUtensils className="logo-icon" />
            <h1>
              Ninja <span>Burger</span>
            </h1>
          </div>
          <div className="header-spacer" />
        </div>
      </header>

      <div className="main-layout">
        <aside className="filters-sidebar">
          <div className="search-wrapper">
            <FaSearch />
            <input
              placeholder="Buscar no cardápio..."
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <nav className="categories">
            <h3>Categorias</h3>
            {categorias.map((cat) => (
              <button
                key={cat}
                className={categoria === cat ? "cat-btn active" : "cat-btn"}
                onClick={() => setCategoria(cat)}
              >
                {cat}
              </button>
            ))}
          </nav>
        </aside>

        <main className="products-feed">
          {loading ? (
            <div className="loading-state">
              <FaSpinner className="spin-icon" />
            </div>
          ) : (
            <div className="products-grid">
              {produtosFiltrados.map((p) => {
                const qnty = carrinho.find((c) => c.id === p.id)?.quantity || 0;
                return (
                  <div
                    key={p.id}
                    className={`product-card ${qnty > 0 ? "selected" : ""}`}
                  >
                    <div className="img-container">
                      <img
                        src={p.image_url || "/placeholder.png"}
                        alt={p.name}
                      />
                      {qnty > 0 && <span className="item-badge">{qnty}</span>}
                    </div>
                    <div className="product-info">
                      <h3>{p.name}</h3>
                      <p className="description">{p.description}</p>
                      <div className="product-footer">
                        <span className="price">
                          R$ {Number(p.price).toFixed(2)}
                        </span>
                        <div className="actions">
                          {qnty > 0 ? (
                            <div className="qty-selector">
                              <button
                                onClick={() => handleCartAction(p, "remove")}
                              >
                                <FaMinus />
                              </button>
                              <span>{qnty}</span>
                              <button
                                onClick={() => handleCartAction(p, "add")}
                              >
                                <FaPlus />
                              </button>
                            </div>
                          ) : (
                            <button
                              className="add-btn"
                              onClick={() => handleCartAction(p, "add")}
                            >
                              Adicionar
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>

        <aside className="cart-sidebar">
          <Cart
            items={carrinho}
            total={subtotal}
            onRemove={(id) => setCarrinho((c) => c.filter((i) => i.id !== id))}
            onFinalize={() => setShowModal(true)}
          />
        </aside>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-card-checkout">
            <div className="modal-header">
              <h2>
                <FaCheckCircle /> Finalizar Pedido
              </h2>
              <button onClick={() => setShowModal(false)} className="close-btn">
                <FaTimes />
              </button>
            </div>
            <form onSubmit={finalizarPedido} className="checkout-form">
              <div className="form-group">
                <input
                  placeholder="Nome"
                  required
                  onChange={(e) =>
                    setCliente({ ...cliente, nome: e.target.value })
                  }
                />
                <input
                  placeholder="WhatsApp"
                  required
                  onChange={(e) =>
                    setCliente({ ...cliente, whatsapp: e.target.value })
                  }
                />
              </div>
              <div className="form-row">
                <input
                  placeholder="CEP"
                  required
                  onChange={(e) => handleCEP(e.target.value)}
                  maxLength={8}
                />
                <input placeholder="Bairro" value={cliente.bairro} readOnly />
              </div>
              <input placeholder="Endereço" value={cliente.endereco} readOnly />
              <div className="form-row">
                <input
                  placeholder="Nº"
                  required
                  onChange={(e) =>
                    setCliente({ ...cliente, numero: e.target.value })
                  }
                />
                <input
                  placeholder="Compl."
                  onChange={(e) =>
                    setCliente({ ...cliente, complemento: e.target.value })
                  }
                />
              </div>

              <textarea
                placeholder="Ex: Tirar cebola, ponto da carne..."
                className="checkout-input-area"
                onChange={(e) =>
                  setCliente({ ...cliente, observacao: e.target.value })
                }
              />

              <div className="form-row">
                <select
                  required
                  onChange={(e) =>
                    setCliente({ ...cliente, pagamento: e.target.value })
                  }
                >
                  <option value="">Forma de Pagamento</option>
                  <option value="Pix">Pix</option>
                  <option value="Cartão">Cartão</option>
                  <option value="Dinheiro">Dinheiro</option>
                </select>
                {cliente.pagamento === "Dinheiro" && (
                  <input
                    placeholder="Troco para quanto?"
                    onChange={(e) =>
                      setCliente({ ...cliente, troco: e.target.value })
                    }
                  />
                )}
              </div>
              <button
                type="submit"
                className="btn-send-order"
                disabled={sending}
              >
                {sending ? (
                  <FaSpinner className="spin-icon" />
                ) : (
                  `CONFIRMAR PEDIDO - R$ ${subtotal.toFixed(2)}`
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cardapio;
