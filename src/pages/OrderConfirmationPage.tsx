import React from 'react';
import {
  CheckCircle2,
  Package,
  Printer,
  MessageCircle,
  Truck,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  MapPin,
  Calendar,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import {
  formatMZN,
  WHATSAPP_DISPLAY,
  generateWhatsAppOrderConfirmationLink,
  formatDate,
} from '../utils/formatters';

export const OrderConfirmationPage: React.FC = () => {
  const { lastCreatedOrder, orders, setCurrentPage } = useStore();

  const order = lastCreatedOrder || orders[0];

  if (!order) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-white mb-4">
          Nenhuma encomenda encontrada.
        </h2>
        <button
          onClick={() => setCurrentPage('shop')}
          className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs"
        >
          Ir para a Loja
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      {/* 1. Success Hero Box */}
      <div className="text-center space-y-4">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-2xl shadow-emerald-600/30">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-800/60">
          Encomenda Registada com Sucesso!
        </span>

        <h1 className="text-3xl sm:text-4xl font-black text-white">
          Obrigado, {order.customerName.split(' ')[0]}!
        </h1>

        <p className="text-sm text-slate-300 max-w-lg mx-auto">
          A sua encomenda <strong className="text-blue-400">#{order.id}</strong> foi recebida no nosso sistema. Enviámos a confirmação detalhada para o e-mail <strong className="text-white">{order.email}</strong>.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href={generateWhatsAppOrderConfirmationLink(
              order.id,
              order.customerName,
              order.total,
              order.province,
              order.paymentMethod
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-xl shadow-emerald-600/25 transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Confirmar Encomenda no WhatsApp</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={() => setCurrentPage('order-tracking')}
            className="px-5 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2 border border-slate-700 transition-all"
          >
            <Truck className="w-4 h-4 text-blue-400" />
            <span>Rastrear Esta Encomenda</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold text-xs flex items-center gap-2 border border-slate-800 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir Recibo Pró-forma</span>
          </button>
        </div>
      </div>

      {/* 2. Order Details Invoice-style Card */}
      <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              Número da Encomenda
            </span>
            <span className="text-2xl font-black text-white font-mono">
              #{order.id}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">
              Data: {formatDate(order.createdAt)}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-950/60 text-amber-300 border border-amber-800/60 uppercase">
              Estado: {order.status}
            </span>
          </div>
        </div>

        {/* Delivery & Payment details grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1.5">
            <h4 className="font-bold text-white text-xs flex items-center gap-1.5 mb-2">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span>Morada de Entrega em Moçambique:</span>
            </h4>
            <div className="text-slate-300 font-medium">{order.customerName}</div>
            <div className="text-slate-400">{order.phone} | {order.email}</div>
            <div className="text-slate-300">{order.address}</div>
            <div className="text-slate-400 font-semibold">{order.city}, {order.province}</div>
            {order.notes && (
              <div className="text-slate-500 italic mt-2">Obs: "{order.notes}"</div>
            )}
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1.5">
            <h4 className="font-bold text-white text-xs flex items-center gap-1.5 mb-2">
              <Truck className="w-4 h-4 text-emerald-400" />
              <span>Método de Pagamento & Envio:</span>
            </h4>
            <div className="text-slate-300">
              <strong className="text-white">Pagamento:</strong> {order.paymentMethod.toUpperCase()}
            </div>
            <div className="text-slate-300">
              <strong className="text-white">Envio:</strong> {order.deliveryMethod}
            </div>
            <div className="text-slate-300">
              <strong className="text-white">Prazo Estimado:</strong> {order.estimatedDelivery || '24h a 48h'}
            </div>
            <div className="text-slate-400 text-[11px] mt-2">
              Para validar o seu pagamento, envie o SMS do M-Pesa / comprovativo bancário para o nosso WhatsApp oficial: <strong>{WHATSAPP_DISPLAY}</strong>.
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="border-t border-slate-800 pt-6">
          <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-4">
            Artigos Encomendados
          </h4>
          <div className="divide-y divide-slate-800/60">
            {order.items.map((item) => (
              <div
                key={item.product.id}
                className="py-3 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-12 h-12 rounded-xl object-cover bg-slate-950 border border-slate-800"
                  />
                  <div>
                    <h5 className="font-bold text-white">{item.product.name}</h5>
                    <span className="text-slate-500 text-[11px]">
                      {item.quantity} unidade(s) x {formatMZN(item.product.price)}
                    </span>
                  </div>
                </div>
                <span className="font-bold text-white">
                  {formatMZN(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Totals */}
        <div className="border-t border-slate-800 pt-4 space-y-2 text-xs">
          <div className="flex justify-between text-slate-400">
            <span>Subtotal:</span>
            <span>{formatMZN(order.subtotal)}</span>
          </div>
          {order.discountAmount > 0 && (
            <div className="flex justify-between text-red-400">
              <span>Desconto:</span>
              <span>-{formatMZN(order.discountAmount)}</span>
            </div>
          )}
          <div className="flex justify-between text-slate-400">
            <span>Portes de Envio:</span>
            <span>{order.shippingFee === 0 ? 'Grátis' : formatMZN(order.shippingFee)}</span>
          </div>
          <div className="flex justify-between text-base font-black text-white pt-2 border-t border-slate-800">
            <span>Total da Factura:</span>
            <span className="text-xl text-blue-400">{formatMZN(order.total)}</span>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={() => setCurrentPage('shop')}
          className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 mx-auto"
        >
          <span>Continuar a Navegar na Loja</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
