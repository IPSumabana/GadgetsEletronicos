import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  ExternalLink,
  Send,
  CheckCircle2,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import {
  STORE_LOCATION,
  STORE_EMAIL,
  WHATSAPP_DISPLAY,
} from '../utils/formatters';

export const ContactPage: React.FC = () => {
  const { showToast } = useStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+258 ');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Mensagem enviada com sucesso! Responderemos em menos de 2 horas.', 'success');
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
          Apoio ao Cliente em Moçambique
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          Fale Connosco
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Estamos disponíveis para esclarecer dúvidas, apoiar na escolha de equipamentos e acompanhar as suas encomendas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info & Map (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 space-y-5">
            <h3 className="text-base font-bold text-white pb-3 border-b border-slate-800">
              Canais Oficiais de Atendimento
            </h3>

            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400 flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-white block">Loja & Escritório Central</span>
                  <span className="text-slate-400">{STORE_LOCATION}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-600/20 text-emerald-400 flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-white block">Telemóvel & WhatsApp</span>
                  <span className="text-slate-400">{WHATSAPP_DISPLAY}</span>
                  <span className="text-[10px] text-slate-500 block">Linha directa Vodacom Moçambique</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-purple-600/20 text-purple-400 flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-white block">Correio Electrónico</span>
                  <span className="text-slate-400">{STORE_EMAIL}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-600/20 text-amber-400 flex-shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-white block">Horário de Atendimento</span>
                  <span className="text-slate-400 block">Segunda a Sexta: 08h00 às 18h30</span>
                  <span className="text-slate-400 block">Sábados: 09h00 às 15h00</span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Action Box */}
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 space-y-2">
              <span className="text-xs font-bold text-white block">
                Resposta Imediata via WhatsApp:
              </span>
              <p className="text-[11px] text-slate-300">
                Tem urgência ou deseja negociar uma encomenda corporativa para a sua empresa em Moçambique?
              </p>
              <a
                href="https://wa.me/258849900110"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Conversar no WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Map Location Card */}
          <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-5 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white">Localização em Maputo:</span>
              <span className="text-blue-400 font-semibold">Polana Cimento</span>
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 relative flex items-center justify-center text-center p-4">
              <div className="space-y-1">
                <MapPin className="w-8 h-8 text-blue-500 mx-auto animate-bounce" />
                <div className="font-bold text-white text-xs">GADGETSZONE Flagship Store</div>
                <div className="text-[11px] text-slate-400">Av. 24 de Julho nº 1420, Maputo</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 space-y-5">
            <h3 className="text-base font-bold text-white pb-3 border-b border-slate-800">
              Envie-nos uma Mensagem
            </h3>

            {submitted ? (
              <div className="p-8 text-center space-y-3 bg-emerald-950/30 border border-emerald-800/40 rounded-2xl">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-white text-base">Mensagem Recebida!</h4>
                <p className="text-xs text-slate-300">
                  Agradecemos o seu contacto. Um especialista da nossa equipa entrará em contacto brevemente pelo telefone ou e-mail fornecido.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 px-4 py-2 rounded-xl bg-slate-800 text-xs text-white hover:bg-slate-700"
                >
                  Enviar Outra Mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      O seu Nome *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Salomão Langa"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="seuemail@exemplo.co.mz"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Telemóvel / WhatsApp em Moçambique
                    </label>
                    <input
                      type="tel"
                      placeholder="+258 84 XXX XXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Assunto *
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white outline-none focus:border-blue-500"
                    >
                      <option value="">Selecione o motivo...</option>
                      <option value="Dúvida sobre Produto">Dúvida sobre Produto</option>
                      <option value="Estado da Encomenda">Estado da Encomenda</option>
                      <option value="Cotação Corporativa / B2B">Cotação Corporativa / B2B</option>
                      <option value="Garantia e Assistência Técnica">Garantia e Assistência Técnica</option>
                      <option value="Outro">Outro Assunto</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Mensagem Detalhada *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Descreva como podemos ajudar ou qual o equipamento de seu interesse..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white outline-none focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30 transition-all active:scale-[0.98]"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Mensagem</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
