import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { WHATSAPP_DISPLAY, WHATSAPP_PHONE_NUMBER } from '../../utils/formatters';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = message.trim() || 'Olá GADGETSZONE! Gostaria de obter assistência técnica e informações sobre produtos.';
    window.open(
      `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(text)}`,
      '_blank'
    );
    setIsOpen(false);
    setMessage('');
  };

  const handleQuickQuestion = (quickText: string) => {
    window.open(
      `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(quickText)}`,
      '_blank'
    );
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-20 md:bottom-5 right-4 md:right-5 z-40 flex flex-col items-end">
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-3xl bg-white border border-emerald-200 p-5 shadow-2xl animate-in slide-in-from-bottom-5 text-xs text-slate-700">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold shadow-md">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Apoio GADGETSZONE</h4>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Online agora em Maputo</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-slate-400 hover:text-slate-900"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="my-3 text-slate-600 leading-relaxed text-[11px]">
            Olá! Em que podemos ajudar hoje? Pergunte sobre disponibilidade de stock, entregas para a sua província ou encomende directamente:
          </p>

          <div className="space-y-1.5 mb-3">
            <button
              onClick={() =>
                handleQuickQuestion(
                  'Olá! Gostaria de saber os prazos e taxas de entrega para a minha província.'
                )
              }
              className="w-full text-left p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[11px] text-slate-700 transition-colors"
            >
              📍 Prazos e envio para as províncias
            </button>
            <button
              onClick={() =>
                handleQuickQuestion(
                  'Olá! Quero saber como pagar por M-Pesa ou e-Mola.'
                )
              }
              className="w-full text-left p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[11px] text-slate-700 transition-colors"
            >
              💳 Dúvidas sobre pagamento M-Pesa / SIMO
            </button>
            <button
              onClick={() =>
                handleQuickQuestion(
                  'Olá! Preciso de cotação corporativa B2B com factura com NUIT.'
                )
              }
              className="w-full text-left p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[11px] text-slate-700 transition-colors"
            >
              💼 Cotação para empresas com factura
            </button>
          </div>

          <form onSubmit={handleSend} className="flex gap-2">
            <input
              type="text"
              placeholder="Escreva a sua mensagem..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-emerald-600"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors flex items-center justify-center shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-xl shadow-emerald-600/30 transition-all hover:scale-105 active:scale-95"
      >
        <MessageCircle className="w-5 h-5 fill-white" />
        <span className="hidden sm:inline">WhatsApp Loja: {WHATSAPP_DISPLAY}</span>
        <span className="sm:hidden font-bold">WhatsApp</span>
      </button>
    </div>
  );
};
