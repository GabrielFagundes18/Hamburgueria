export const checkStoreStatus = () => {
  const agora = new Date();
  const diaSemana = agora.getDay(); // 0 (Dom) a 6 (Sab)
  const horaAtual = agora.getHours();
  const minutosAtuais = agora.getMinutes();
  
  const tempoAtual = horaAtual * 60 + minutosAtuais;
  const abertura = 18 * 60; // 18:00

  // Segunda-feira (1) FECHADO
  if (diaSemana === 1) {
    return { isOpen: false, message: "Fechado - Abre Terça às 18:00" };
  }

  // Define fechamento: Sexta, Sábado e Domingo às 00:00. Outros dias às 23:00.
  const fechamento = (diaSemana === 5 || diaSemana === 6 || diaSemana === 0) 
    ? 24 * 60 
    : 23 * 60;

  const isOpen = tempoAtual >= abertura && tempoAtual < fechamento;

  return {
    isOpen: isOpen,
    message: isOpen ? "Aberto Agora" : "Fechado no momento",
    nextOpening: "Diariamente das 18h às 23h (FDS até 00h)"
  };
};