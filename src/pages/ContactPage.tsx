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
  WHATSAPP_PHONE_NUMBER,
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
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
          Apoio ao Cliente em Moçambique
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          Fale Connosco
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Estamos disponíveis para esclarecer dúvidas, apoiar na escolha de equipamentos e acompanhar as suas encomendas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info & Map (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6 space-y-5">
            <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-200">
              Canais Oficiais de Atendimento
            </h3>

            <div className="space-y-4 text-xs text-slate-700">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">Loja & Escritório Central</span>
                  <span className="text-slate-600">{STORE_LOCATION}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">Telemóvel & WhatsApp</span>
                  <span className="text-slate-600">{WHATSAPP_DISPLAY}</span>
                  <span className="text-[10px] text-slate-500 block">Linha directa Moçambique</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 border border-purple-200 flex-shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">Correio Electrónico</span>
                  <span className="text-slate-600">{STORE_EMAIL}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 border border-amber-200 flex-shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">Horário de Atendimento</span>
                  <span className="text-slate-600 block">Segunda a Sexta: 08h00 às 18h30</span>
                  <span className="text-slate-600 block">Sábados: 09h00 às 15h00</span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Action Box */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
              <span className="text-xs font-bold text-slate-900 block">
                Resposta Imediata via WhatsApp:
              </span>
              <p className="text-[11px] text-slate-700">
                Tem urgência ou deseja negociar uma encomenda corporativa para a sua empresa em Moçambique?
              </p>
              <a
                href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Conversar no WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Map Location Card */}
          <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-5 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900">Localização em Maputo:</span>
              <span className="text-blue-600 font-semibold">Polana Cimento</span>
            </div>
            <div className="aspect-video rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 relative flex items-center justify-center text-center p-4">
              <div className="space-y-1">
                <MapPin className="w-8 h-8 text-blue-600 mx-auto animate-bounce" />
                <div className="font-bold text-slate-900 text-xs">GADGETSZONE Flagship Store</div>
                <div className="text-[11px] text-slate-600">Av. 24 de Julho nº 1420, Maputo</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5">
            <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-200">
              Envie-nos uma Mensagem
            </h3>

            {submitted ? (
              <div className="p-8 text-center space-y-3 bg-emerald-50 border border-emerald-200 rounded-2xl">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-slate-900 text-base">Mensagem Recebida!</h4>
                <p className="text-xs text-slate-700">
                  Agradecemos o seu contacto. Um especialista da nossa equipa entrará em contacto brevemente pelo telefone ou e-mail fornecido.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 px-4 py-2 rounded-xl bg-white border border-slate-300 text-xs font-semibold text-slate-800 hover:bg-slate-50"
                >
                  Enviar Outra Mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      O seu Nome *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Salomão Langa"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="seuemail@exemplo.co.mz"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Telemóvel / WhatsApp em Moçambique
                    </label>
                    <input
                      type="tel"
                      placeholder="+258 84 XXX XXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Assunto *
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 outline-none focus:border-blue-600 focus:bg-white"
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
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Mensagem Detalhada *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Descreva como podemos ajudar ou qual o equipamento de seu interesse..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-blue-600 focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98]"
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
