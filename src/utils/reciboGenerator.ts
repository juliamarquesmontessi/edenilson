import { format } from 'date-fns';

interface ReciboData {
  docNumero: string;
  cliente: string;
  vencimento: string;
  valorPagoHoje: number;
  parcelaAtual?: number;
  totalParcelas?: number;
  pagoConfirmado: number;
  dataGeracao: Date;
}

export function gerarRecibo(data: ReciboData): string {
  const {
    docNumero,
    cliente,
    vencimento,
    valorPagoHoje,
    parcelaAtual,
    totalParcelas,
    pagoConfirmado,
    dataGeracao
  } = data;

  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  const parcelaInfo = parcelaAtual && totalParcelas 
    ? `Parcela: ${parcelaAtual}/${totalParcelas}\n`
    : '';

  return `🧾 *RECIBO DE PAGAMENTO*

📋 *Documento:* ${docNumero}
👤 *Cliente:* ${cliente}
📅 *Vencimento:* ${vencimento}

💰 *Valor Pago Hoje:* ${formatCurrency(valorPagoHoje)}
${parcelaInfo}💵 *Total Pago Confirmado:* ${formatCurrency(pagoConfirmado)}

📅 *Data de Geração:* ${format(dataGeracao, 'dd/MM/yyyy HH:mm')}

✅ Pagamento recebido com sucesso!
Obrigado pela confiança! 🙏`;
}