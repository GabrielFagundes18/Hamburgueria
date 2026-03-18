export const checkStoreStatus = () => {
  const agora = new Date();
  const diaSemana = agora.getDay(); // 0 (Dom) a 6 (Sab)
  const horaAtual = agora.getHours();
  const minutosAtuais = agora.getMinutes();
  
  const tempoAtual = horaAtual * 60 + minutosAtuais;
  const abertura = 10 * 60; // 18:00 (em minutos)

  // 1. Segunda-feira: Sempre FECHADO
  if (diaSemana === 1) return { isOpen: false, message: "Fechado - Abre Terça às 18h" };

  // 2. Define o fechamento: Sex, Sab e Dom às 00h (24:00). Outros dias às 23h.
  const fechamento = (diaSemana === 5 || diaSemana === 6 || diaSemana === 0) 
    ? 24 * 60 
    : 23 * 60;

  const isOpen = tempoAtual >= abertura && tempoAtual < fechamento;

  return {
    isOpen: isOpen,
    message: isOpen ? "Aberto Agora" : "Fechado no momento"
  };
};