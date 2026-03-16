import React, { useState, useEffect } from "react";
import axios from "axios";
import Cart from "../../components/Cart";
import {
  FaReply,
  FaSpinner,
  FaPlus,
  FaMinus,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaCreditCard,
  FaMoneyBillWave,
  FaEdit,
} from "react-icons/fa";
import "./style.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import StatusLoja from "../../components/StatusLoja";
import { checkStoreStatus } from "../../utils/storeStatus";

const Cardapio = () => {
  const status = checkStoreStatus();

  const [produtos, setProdutos] = useState([]);
  const [categoria, setCategoria] = useState("todos");
  const [carrinho, setCarrinho] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const BAIRROS_ATENDIDOS = [
    "Centro",
    "Vila Olimpia",
    "Jardins",
    "Moema",
    "Itaim Bibi",
    "Brooklin",
    "Mikail II",
  ];

  const [entregaPermitida, setEntregaPermitida] = useState(true);

  const [cliente, setCliente] = useState({
    nome: "",
    whatsapp: "",
    cep: "",
    endereco: "",
    bairro: "",
    numero: "",
    complemento: "",
    pagamento: "",
    troco: "",
    observacao: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "unset";
  }, [showModal]);

  useEffect(() => {
    const carregarDados = async () => {
      setLoading(true);
      try {
        const url =
          categoria === "todos"
            ? "https://backend-hamburgueria.onrender.com/products"
            : `https://backend-hamburgueria.onrender.com/products?category=${categoria}`;
        const res = await axios.get(url);
        setProdutos(res.data);
      } catch (err) {
        toast.error("Erro ao carregar o cardápio.");
      } finally {
        setLoading(false);
      }
    };
    carregarDados();
  }, [categoria]);

  const adicionarAoCarrinho = (p) => {
    setCarrinho((prev) => {
      const existe = prev.find((item) => item.id === p.id);
      if (existe) {
        return prev.map((item) =>
          item.id === p.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      toast.dismiss();
      toast.success(`${p.name} adicionado!`, { icon: "🍔" });
      return [...prev, { ...p, quantity: 1 }];
    });
  };

  const removerUmItem = (id) => {
    setCarrinho((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item?.quantity > 1) {
        return prev.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i,
        );
      }
      return prev.filter((i) => i.id !== id);
    });
  };

  const total = carrinho.reduce(
    (acc, item) => acc + parseFloat(item.price) * item.quantity,
    0,
  );

  const handleCEPChange = async (e) => {
    const valor = e.target.value.replace(/\D/g, "");
    setCliente((prev) => ({ ...prev, cep: valor }));

    if (valor.length === 8) {
      const loadCep = toast.loading("Buscando endereço...");
      try {
        const res = await axios.get(`https://viacep.com.br/ws/${valor}/json/`);
        if (res.data.erro) {
          toast.error("CEP não encontrado.", { id: loadCep });
          return;
        }
        const { logradouro, bairro } = res.data;
        const atende = BAIRROS_ATENDIDOS.some(
          (b) => b.toLowerCase() === (bairro?.toLowerCase() || ""),
        );
        setCliente((prev) => ({
          ...prev,
          endereco: logradouro,
          bairro: bairro,
        }));
        setEntregaPermitida(atende);
        atende
          ? toast.success("Endereço ok!", { id: loadCep })
          : toast.error("Área não atendida.", { id: loadCep });
      } catch (err) {
        toast.error("Erro na busca.", { id: loadCep });
      }
    }
  };

  const finalizarPedido = async (e) => {
    e.preventDefault();
    if (!status.isOpen) return toast.error("Loja fechada no momento.");
    if (!entregaPermitida) return toast.error("Não entregamos no seu bairro.");
    if (carrinho.length === 0) return toast.error("Carrinho vazio!");

    setSending(true);
    const pedidoParaBanco = {
      customer_name: cliente.nome,
      customer_whatsapp: cliente.whatsapp,
      total_price: Number(total.toFixed(2)),
      status: "pendente",
      cep: cliente.cep,
      address_street: cliente.endereco,
      address_number: cliente.numero,
      address_complement: cliente.complemento || "N/A",
      address_neighborhood: cliente.bairro,
      payment_method: cliente.pagamento,
      change_details:
        cliente.pagamento === "Dinheiro"
          ? `Troco para R$ ${cliente.troco}`
          : "N/A",
      notes: cliente.observacao || "Sem observações",
      items: carrinho.map((item) => ({
        product_id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: Number(parseFloat(item.price).toFixed(2)),
      })),
    };

    try {
      await axios.post(
        "https://backend-hamburgueria.onrender.com/orders/checkout",
        pedidoParaBanco,
      );
      toast.success("🔥 Pedido enviado para a cozinha!", { duration: 5000 });
      setCarrinho([]);
      setShowModal(false);
      setCliente({
        nome: "",
        whatsapp: "",
        cep: "",
        endereco: "",
        bairro: "",
        numero: "",
        complemento: "",
        pagamento: "",
        troco: "",
        observacao: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "❌ Erro ao enviar pedido.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="cardapio-page">
      {/* 1. Aviso de Loja Fechada no Topo */}
      {!status.isOpen && (
        <div className="aviso-fechado">
          Loja fechada no momento. Horário de funcionamento: Terça a Quinta das
          18:00 às 23:00 e Sexta a Domingo das 18:00 às 00:00.
        </div>
      )}

      <header className="main-header">
        <button className="cart-voltar" onClick={() => navigate("/")}>
          <FaReply />
        </button>
        <h1 className="logo">
          Ninja <span>Burger</span>
        </h1>
        <div className="cart-status">
          <StatusLoja />
        </div>
      </header>

      <div className="cardapio-container">
        <main className="products-section">
          <nav className="filter-nav">
            {[
              "todos",
              "Hambúrgueres",
              "Combo",
              "Bebidas",
              "Acompanhamentos",
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

          {loading ? (
            <div className="loading-container">
              <FaSpinner className="spinner" />
              <p>Preparando cardápio...</p>
            </div>
          ) : (
            <div className="product-grid">
              {produtos.map((item) => {
                const itemNoCarrinho = carrinho.find((c) => c.id === item.id);
                return (
                  <div key={item.id} className="product-card">
                    <img src={item.image_url} alt={item.name} loading="lazy" />
                    <div className="product-details">
                      <h3>{item.name}</h3>
                      <p>{item.description}</p>
                      <div className="product-footer">
                        <span className="price">
                          R$ {parseFloat(item.price).toFixed(2)}
                        </span>
                        {itemNoCarrinho ? (
                          <div className="quantity-control-card">
                            <button onClick={() => removerUmItem(item.id)}>
                              <FaMinus />
                            </button>
                            <span>{itemNoCarrinho.quantity}</span>
                            <button onClick={() => adicionarAoCarrinho(item)}>
                              <FaPlus />
                            </button>
                          </div>
                        ) : (
                          <button
                            className="add-btn"
                            onClick={() => adicionarAoCarrinho(item)}
                          >
                            <FaPlus />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>

        {/* 2. Componente de Carrinho com Trava de Abertura do Modal */}
        <Cart
          items={carrinho}
          onRemove={(id) =>
            setCarrinho((prev) => prev.filter((i) => i.id !== id))
          }
          total={total}
          onFinalize={() => {
            if (!status.isOpen) {
              toast.error(
                "O mestre ninja está descansando. Voltamos às 18:00!",
                { icon: "🏮" },
              );
              return;
            }
            setShowModal(true);
          }}
        />
      </div>

      {/* 3. Modal de Finalização com Trava no Botão Confirmar */}
      {showModal && (
        <div className="modal-overlay">
          <form className="modal-form" onSubmit={finalizarPedido}>
            <div className="modal-header-ux">
              <h2>
                <FaCheckCircle /> Finalizar Pedido
              </h2>
              <p>Preencha os detalhes da entrega</p>
            </div>

            <div className="modal-body">
              <section className="form-section">
                <label>
                  <FaPlus /> Dados do Cliente
                </label>
                <input
                  type="text"
                  placeholder="Nome"
                  required
                  value={cliente.nome}
                  onChange={(e) =>
                    setCliente({ ...cliente, nome: e.target.value })
                  }
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
              </section>

              <section className="form-section">
                <label>
                  <FaMapMarkerAlt /> Endereço Ninja
                </label>
                <input
                  type="text"
                  placeholder="CEP"
                  required
                  maxLength="8"
                  value={cliente.cep}
                  onChange={handleCEPChange}
                />
                <input
                  type="text"
                  placeholder="Endereço"
                  required
                  value={cliente.endereco}
                  readOnly
                  className="readonly-input"
                />
                <div className="input-row">
                  <input
                    type="text"
                    placeholder="Nº"
                    required
                    value={cliente.numero}
                    onChange={(e) =>
                      setCliente({ ...cliente, numero: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Comp."
                    value={cliente.complemento}
                    onChange={(e) =>
                      setCliente({ ...cliente, complemento: e.target.value })
                    }
                  />
                </div>
                <input
                  type="text"
                  placeholder="Bairro"
                  required
                  value={cliente.bairro}
                  readOnly
                  className="readonly-input"
                />
              </section>

              {!entregaPermitida && (
                <div className="delivery-badge-error">
                  Bairro não atendido para entrega.
                </div>
              )}

              <section className="form-section">
                <label>
                  <FaEdit /> Observações do Pedido
                </label>
                <textarea
                  placeholder="Ex: Tirar cebola..."
                  value={cliente.observacao}
                  onChange={(e) =>
                    setCliente({ ...cliente, observacao: e.target.value })
                  }
                  rows="3"
                  className="modal-textarea"
                />
              </section>

              <section className="form-section">
                <label>
                  <FaCreditCard /> Forma de Pagamento
                </label>
                <select
                  required
                  value={cliente.pagamento}
                  onChange={(e) =>
                    setCliente({ ...cliente, pagamento: e.target.value })
                  }
                >
                  <option value="">Selecione...</option>
                  <option value="Cartão">Cartão (Máquina)</option>
                  <option value="Pix">Pix</option>
                  <option value="Dinheiro">Dinheiro</option>
                </select>
                {cliente.pagamento === "Dinheiro" && (
                  <div className="troco-container animated fadeIn">
                    <label className="sub-label">
                      <FaMoneyBillWave /> Precisa de troco para quanto?
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: 100,00"
                      value={cliente.troco}
                      onChange={(e) =>
                        setCliente({ ...cliente, troco: e.target.value })
                      }
                    />
                  </div>
                )}
              </section>
            </div>

            <div className="modal-footer-ux">
              <div className="total-display">
                <span>Total a Pagar:</span>
                <strong>R$ {total.toFixed(2)}</strong>
              </div>
              <div className="modal-btns">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowModal(false)}
                >
                  Voltar
                </button>
                <button
                  type="submit"
                  className="confirm"
                  disabled={!entregaPermitida || sending || !status.isOpen}
                >
                  {sending ? (
                    <FaSpinner className="spinner" />
                  ) : !status.isOpen ? (
                    "Loja Fechada"
                  ) : (
                    "Enviar Pedido"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Cardapio;
