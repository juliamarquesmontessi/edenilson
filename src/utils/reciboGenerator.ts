<<<<<<< HEAD
// Função utilitária para gerar texto de recibo de pagamento
export function gerarRecibo({
  docNumero,
  cliente,
  vencimento,
  dataPagamento,
  pagoConfirmado,
  valorPagoHoje,
  dataGeracao,
  parcelasPagasStr
}: {
  docNumero: string | number;
  cliente: string;
  vencimento: string;
  dataPagamento: string;
  pagoConfirmado: number;
  valorPagoHoje: number;
  dataGeracao: Date;
  parcelasPagasStr?: string;
}) {
  return `RECIBO DE PAGAMENTO - Doc Nº ${docNumero}\n\n` +
    `Cliente: ${cliente}\n` +
    `Vencimento: ${vencimento}\n` +
    `Data de pagamento: ${dataPagamento}\n` +
    (parcelasPagasStr ? `Parcelas pagas: ${parcelasPagasStr}\n` : '') +
    `Pago confirmado: ${pagoConfirmado.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}\n` +
    `Valor pago hoje: ${valorPagoHoje.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}\n` +
    `--------------------------\n\n` +
    `Gerado em: ${dataGeracao.toLocaleDateString('pt-BR')} ${dataGeracao.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}\n\n` +
    `ATENÇÃO:\nOs dados acima informados são apenas para simples conferência e não servem como comprovante\u00a0de\u00a0pagamento.`;
}
=======
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
>>>>>>> dc3fd465cefafd4c30e6629156e4532819891d71
