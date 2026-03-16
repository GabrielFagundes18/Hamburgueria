# 🥷 Ninja Burger - Cardápio Digital (Front-end)

O **Ninja Burger** é uma plataforma de pedidos online desenvolvida com foco em performance e experiência do usuário (UX). Este repositório contém a interface do cliente, uma Single Page Application (SPA) responsiva que permite a navegação por produtos, gestão de carrinho e finalização de pedidos em tempo real.

---

## 🚀 Tecnologias e Decisões Técnicas

- **React 19:** Utilização de Hooks (`useState`, `useEffect`) para gestão de estado global e ciclo de vida.
- **Integração com API (Axios):** Consumo de rotas assíncronas para listagem dinâmica de produtos e envio de pedidos via POST.
- **Feedback em Tempo Real:** Implementação do `react-hot-toast` para notificações de sucesso/erro, melhorando a interatividade.
- **Geolocalização via CEP:** Integração com a API ViaCEP para otimizar o checkout e reduzir a taxa de abandono de carrinho.
- **Arquitetura CSS:** Uso de variáveis globais (`:root`) para facilitar a manutenção de cores e temas (Dark Mode nativo).

---

## 🏮 Diferenciais do Projeto

### 🧠 Validação de Regras de Negócio
- **Trava de Horário:** O sistema consulta o estado da loja antes de permitir a finalização do pedido. Se a loja estiver fechada, o botão de checkout é desativado e o usuário recebe um aviso amigável.
- **Restrição de Bairros:** Diferente de cardápios simples, o Ninja Burger possui uma lista de bairros atendidos. Caso o CEP do cliente retorne um bairro fora do raio de entrega, o pedido é bloqueado.

### ⚡ UX & Design Responsivo
- **Mobile-First:** A interface foi pensada primeiro para dispositivos móveis, com botões de fácil clique e navegação fluida.
- **Efeito Ninja Pulse:** Um indicador visual neon que utiliza animações CSS (@keyframes) para mostrar que a loja está "viva" e aceitando pedidos.
- **Checkout Dinâmico:** Campos como o de "Troco" só aparecem se a opção "Dinheiro" for selecionada, mantendo o formulário limpo.

---

## 🛠️ Como Executar

1. **Requisitos:** Certifique-se de ter o Node.js instalado.
2. **Instalação:**
   ```bash
   npm install