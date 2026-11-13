import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, MessageCircle } from 'lucide-react';
import { WHATSAPP_DISPLAY, WHATSAPP_PHONE_NUMBER } from '../utils/formatters';

interface FAQItem {
  q: string;
  a: string;
  cat: 'pagamento' | 'entregas' | 'garantia' | 'geral';
}

export const FAQPage: React.FC = () => {
  const [activeCat, setActiveCat] = useState<'all' | 'pagamento' | 'entregas' | 'garantia'>('all');
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [search, setSearch] = useState('');

  const faqs: FAQItem[] = [
    {
      cat: 'pagamento',
      q: 'Quais são os métodos de pagamento aceites em Moçambique?',
      a: 'Aceitamos M-Pesa (Vodacom), e-Mola (Movitel), cartões de débito/crédito na rede SIMO Moçambique (Visa/Mastercard), transferências bancárias para contas no Millennium BIM, BCI ou Standard Bank e, para clientes na Grande Maputo e Matola, disponibilizamos também o pagamento em numerário ou POS móvel no acto da entrega.',
    },
    {
      cat: 'pagamento',
      q: 'Como confirmo o pagamento via M-Pesa ou e-Mola?',
      a: 'Após transferir o valor para a nossa conta comercial (M-Pesa ou e-Mola), basta clicar no botão de confirmação pelo WhatsApp e encaminhar a mensagem SMS recebida com o ID da sua encomenda #GZ-XXXX.',
    },
    {
      cat: 'entregas',
      q: 'Quais as zonas onde fazem entregas?',
      a: 'Realizamos entregas rápidas em toda a Cidade de Maputo (Polana, Central, Sommerschield, Costa do Sol, Alto Maé, Zimpeto, etc.) e na Matola (Matola Rio, Machava, Liberdade, Tsalala, Fomento e arredores), além de levantamento gratuito na nossa loja na Polana.',
    },
    {
      cat: 'entregas',
      q: 'Qual o tempo de entrega para Maputo e Matola?',
      a: 'Para encomendas confirmadas até às 13h00 na cidade de Maputo e Matola, a entrega pode ocorrer no próprio dia ou no prazo máximo de 24 horas.',
    },
    {
      cat: 'garantia',
      q: 'Os produtos são originais e selados?',
      a: 'Sim, a 100%. Todos os equipamentos comercializados pela GADGETSZONE são rigorosamente novos, vêm na embalagem original selada de fábrica com número de série correspondente e factura com NUIT.',
    },
    {
      cat: 'garantia',
      q: 'Como funciona a garantia oficial de 12 meses?',
      a: 'A garantia cobre defeitos de fabrico e falhas de componentes de hardware. Caso o equipamento apresente alguma anomalia, o cliente pode entregar na nossa loja física na Polana (Maputo) ou enviar pela transportadora para diagnóstico e reparação ou substituição imediata.',
    },
    {
      cat: 'geral',
      q: 'É possível levantar a encomenda pessoalmente na loja?',
      a: 'Sim! Durante o checkout, selecione a opção "Levantamento na Loja Polana Maputo". A nossa equipa entrará em contacto assim que o seu artigo estiver pronto para levantamento.',
    },
  ];

  const filteredFaqs = faqs.filter((item) => {
    if (activeCat !== 'all' && item.cat !== activeCat) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-10">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
          Tire as Suas Dúvidas
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          Perguntas Frequentes (FAQ)
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Respostas claras sobre compras, métodos de pagamento em Meticais, garantias e entregas em Maputo e Matola.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md mx-auto">
        <input
          type="text"
          placeholder="Pesquisar por M-Pesa, garantia, entregas..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-blue-600 shadow-sm"
        />
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {[
          { id: 'all', label: 'Todas as Perguntas' },
          { id: 'pagamento', label: 'Pagamentos & M-Pesa' },
          { id: 'entregas', label: 'Entregas Maputo & Matola' },
          { id: 'garantia', label: 'Garantia & Assistência' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveCat(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeCat === tab.id
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl bg-white border border-slate-200 overflow-hidden transition-all shadow-sm"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left font-bold text-slate-900 text-xs sm:text-sm hover:text-blue-600 transition-colors"
              >
                <span>{faq.q}</span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-blue-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                )}
              </button>
              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* WhatsApp Help Box */}
      <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 text-center space-y-3">
        <h3 className="font-bold text-slate-900 text-sm">
          Ainda tem alguma dúvida técnica ou questão específica?
        </h3>
        <p className="text-xs text-slate-600 max-w-sm mx-auto">
          Fale diretamente com os nossos consultores pelo WhatsApp: <strong className="text-slate-900">{WHATSAPP_DISPLAY}</strong>
        </p>
        <a
          href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-all"
        >
          <MessageCircle className="w-4 h-4" />
          <span>Falar com Consultor Agora</span>
        </a>
      </div>
    </div>
  );
};
