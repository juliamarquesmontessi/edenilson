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
