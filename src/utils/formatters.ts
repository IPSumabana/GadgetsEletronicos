export const WHATSAPP_PHONE_NUMBER = '258823441439'; // WhatsApp oficial GADGETSZONE Moçambique
export const WHATSAPP_DISPLAY = '+258 82 344 1439';
export const STORE_EMAIL = 'contacto@gadgetszone.co.mz';
export const STORE_LOCATION = 'Av. 24 de Julho nº 1420, Polana Cimento, Maputo, Moçambique';

/**
 * Formata um número para a moeda Moçambicana (Meticais - MZN)
 * Exemplo: 245000 -> "245.000 MT"
 */
export function formatMZN(amount: number): string {
  if (isNaN(amount)) return '0 MT';
  return new Intl.NumberFormat('pt-MZ', {
    style: 'decimal',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(amount) + ' MT';
}

/**
 * Gera um link directo do WhatsApp para encomendar ou pedir suporte
 */
export function generateWhatsAppOrderLink(
  productName: string,
  price: number,
  sku?: string
): string {
  const message = `Olá GADGETSZONE! Gostaria de obter informações e encomendar o seguinte equipamento:\n\n📦 *Produto:* ${productName}\n💰 *Preço:* ${formatMZN(price)}${sku ? `\n🏷️ *SKU:* ${sku}` : ''}\n\nPodem confirmar a disponibilidade e prazo de entrega para a minha zona em Moçambique? Obrigado!`;
  return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Gera um link do WhatsApp com os dados completos de uma encomenda realizada
 */
export function generateWhatsAppOrderConfirmationLink(
  orderId: string,
  customerName: string,
  total: number,
  province: string,
  paymentMethod: string
): string {
  const message = `Olá GADGETSZONE! Acabei de submeter a encomenda *#${orderId}* no vosso website.\n\n👤 *Cliente:* ${customerName}\n📍 *Província / Entrega:* ${province}\n💳 *Método de Pagamento:* ${paymentMethod}\n💵 *Total:* ${formatMZN(total)}\n\nEnvio esta mensagem para confirmar o pedido e enviar o comprovativo. Obrigado!`;
  return `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Formata data no padrão moçambicano / português
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-MZ', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date);
  } catch {
    return dateString;
  }
}
