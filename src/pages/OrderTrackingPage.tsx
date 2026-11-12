import React, { useState } from 'react';
import {
  Search,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  ShieldCheck,
  MapPin,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatMZN, WHATSAPP_DISPLAY, formatDate } from '../utils/formatters';
import { Order, OrderStatus } from '../types';

export const OrderTrackingPage: React.FC = () => {
  const { orders } = useStore();

  const [searchQuery, setSearchQuery] = useState('GZ-84920'); // prefilled with sample order
  const [foundOrder, setFoundOrder] = useState<Order | null>(
    orders.find((o) => o.id === 'GZ-84920') || orders[0] || null
  );
  const [searched, setSearched] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = searchQuery.trim().replace('#', '').toUpperCase();
    const match = orders.find(
      (o) =>
        o.id.toUpperCase() === clean ||
        o.phone.includes(searchQuery.trim()) ||
        o.email.toLowerCase() === searchQuery.trim().toLowerCase()
    );
    setFoundOrder(match || null);
    setSearched(true);
  };

  const steps: { status: OrderStatus; label: string; desc: string }[] = [
    {
      status: 'pendente',
      label: '1. Pedido Recebido',
      desc: 'Registo inicial no sistema da GADGETSZONE.',
    },
    {
      status: 'confirmado',
      label: '2. Pagamento Confirmado',
      desc: 'Validação do comprovativo M-Pesa, e-Mola ou SIMO.',
    },
    {
      status: 'em_preparacao',
      label: '3. Embalamento & Selagem',
      desc: 'Inspecção técnica do equipamento e emissão de factura.',
    },
    {
      status: 'em_transito',
      label: '4. Em Trânsito / Estafeta',
      desc: 'A caminho da sua morada ou na transportadora provincial.',
    },
    {
      status: 'entregue',
      label: '5. Entregue com Sucesso',
      desc: 'Recebido e conferido pelo cliente.',
    },
  ];

  const getStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'pendente':
        return 0;
      case 'confirmado':
        return 1;
      case 'em_preparacao':
        return 2;
      case 'em_transito':
        return 3;
      case 'entregue':
        return 4;
      default:
        return 0;
    }
  };

  const currentStepIndex = foundOrder ? getStepIndex(foundOrder.status) : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
          Serviço de Logística Moçambique
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          Rastreamento de Encomendas em Tempo Real
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Insira o código da encomenda (Ex: <strong>GZ-84920</strong>) ou o seu número de telemóvel para verificar o estado da entrega.
        </p>
      </div>

      {/* Search Input Box */}
      <form onSubmit={handleSearch} className="max-w-xl mx-auto flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            required
            placeholder="Ex: GZ-84920 ou 84 312 9940"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 font-mono"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        </div>
        <button
          type="submit"
          className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-colors flex-shrink-0"
        >
          Rastrear
        </button>
      </form>

      {/* Tracking Results */}
      {searched && foundOrder ? (
        <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 space-y-8 animate-in fade-in">
          {/* Top Info Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div>
              <div className="text-[11px] text-slate-400 font-medium">
                Código de Rastreamento:
              </div>
              <div className="text-2xl font-black text-white font-mono flex items-center gap-2">
                <span>#{foundOrder.id}</span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2.5 py-0.5 rounded-full uppercase">
                  {foundOrder.status.replace('_', ' ')}
                </span>
              </div>
            </div>

            <div className="text-xs text-slate-400 sm:text-right">
              <div>
                Data de Criação: <strong className="text-white">{formatDate(foundOrder.createdAt)}</strong>
              </div>
              <div>
                Destino: <strong className="text-white">{foundOrder.city}, {foundOrder.province}</strong>
              </div>
              <div>
                Previsão de Chegada: <strong className="text-blue-400">{foundOrder.estimatedDelivery || 'Hoje / 24h'}</strong>
              </div>
            </div>
          </div>

          {/* Interactive Steps Timeline */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6">
              Progresso do Envio em Moçambique:
            </h3>

            <div className="relative">
              {/* Line connector */}
              <div className="hidden sm:block absolute top-1/2 left-0 right-0 h-1 bg-slate-800 -translate-y-1/2 z-0" />
              <div
                className="hidden sm:block absolute top-1/2 left-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 -translate-y-1/2 z-0 transition-all duration-700"
                style={{
                  width: `${(currentStepIndex / (steps.length - 1)) * 100}%`,
                }}
              />

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 sm:gap-2 relative z-10">
                {steps.map((st, idx) => {
                  const isCompleted = idx <= currentStepIndex;
                  const isCurrent = idx === currentStepIndex;

                  return (
                    <div
                      key={st.status}
                      className="flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2"
                    >
                      <div
                        className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-xs transition-all ${
                          isCompleted
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-4 ring-blue-950'
                            : 'bg-slate-950 border border-slate-800 text-slate-500'
                        }`}
                      >
                        {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                      </div>

                      <div>
                        <div
                          className={`text-xs font-bold ${
                            isCurrent ? 'text-blue-400' : isCompleted ? 'text-white' : 'text-slate-500'
                          }`}
                        >
                          {st.label}
                        </div>
                        <div className="text-[10px] text-slate-400 max-w-[140px] sm:mx-auto mt-0.5">
                          {st.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Items in this Order */}
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
            <h4 className="text-xs font-bold text-white mb-3">
              Itens desta encomenda:
            </h4>
            <div className="space-y-2">
              {foundOrder.items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center justify-between text-xs text-slate-300"
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-8 h-8 rounded-lg object-cover bg-slate-900"
                    />
                    <span className="font-semibold text-white truncate max-w-xs">
                      {item.product.name}
                    </span>
                    <span className="text-slate-500">x{item.quantity}</span>
                  </div>
                  <span className="font-bold text-white">
                    {formatMZN(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Direct WhatsApp check */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Precisa de falar com o estafeta ou alterar a morada?</span>
            </div>
            <a
              href={`https://wa.me/258849900110?text=Ol%C3%A1%20GADGETSZONE!%20Gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20a%20encomenda%20%23${foundOrder.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1.5"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Falar com o Suporte da Logística: {WHATSAPP_DISPLAY}</span>
            </a>
          </div>
        </div>
      ) : searched ? (
        <div className="p-8 text-center rounded-3xl bg-slate-900/50 border border-slate-800">
          <p className="text-sm text-slate-300">
            Nenhuma encomenda encontrada com o código <strong>"{searchQuery}"</strong>.
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Certifique-se de que inseriu o código com o formato <strong>#GZ-XXXXX</strong> ou contacte o nosso WhatsApp para assistência manual.
          </p>
        </div>
      ) : null}
    </div>
  );
};
