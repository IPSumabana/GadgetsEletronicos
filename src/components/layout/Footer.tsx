import React, { useState } from 'react';
import {
  Sparkles,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  ArrowRight,
  ExternalLink,
  CreditCard,
  Smartphone,
  Building2,
  HandCoins,
} from 'lucide-react';
import { useStore, NavigationPage } from '../../context/StoreContext';
import {
  WHATSAPP_DISPLAY,
  STORE_EMAIL,
  STORE_LOCATION,
} from '../../utils/formatters';

export const Footer: React.FC = () => {
  const { setCurrentPage, setSelectedCategory, subscribeNewsletter } = useStore();
  const [emailInput, setEmailInput] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (subscribeNewsletter(emailInput)) {
      setEmailInput('');
    }
  };

  return (
    <footer className="bg-[#05080e] border-t border-slate-800 text-slate-400 text-xs mt-16">
      {/* 1. Value Proposition Highlights Bar */}
      <div className="border-b border-slate-800/80 py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-slate-900/40 border border-slate-800/60">
            <div className="p-3 rounded-xl bg-blue-600/10 text-blue-400 border border-blue-500/20 flex-shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Entregas em Moçambique</h4>
              <p className="text-slate-400 text-xs mt-0.5">
                Mesmo dia em Maputo e Matola; envios diários para todas as províncias.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-slate-900/40 border border-slate-800/60">
            <div className="p-3 rounded-xl bg-purple-600/10 text-purple-400 border border-purple-500/20 flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Garantia Oficial 12 Meses</h4>
              <p className="text-slate-400 text-xs mt-0.5">
                Artigos 100% selados e originais com assistência técnica local em Maputo.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-slate-900/40 border border-slate-800/60">
            <div className="p-3 rounded-xl bg-emerald-600/10 text-emerald-400 border border-emerald-500/20 flex-shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">M-Pesa, e-Mola & SIMO</h4>
              <p className="text-slate-400 text-xs mt-0.5">
                Métodos de pagamento locais moçambicanos seguros e sem complicações.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-slate-900/40 border border-slate-800/60">
            <div className="p-3 rounded-xl bg-amber-600/10 text-amber-400 border border-amber-500/20 flex-shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Suporte WhatsApp 24/7</h4>
              <p className="text-slate-400 text-xs mt-0.5">
                Atendimento rápido por consultores de tecnologia moçambicanos.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => setCurrentPage('home')}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white">
                GADGETS<span className="text-blue-500">ZONE</span>
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              A GADGETSZONE é a loja online premium de tecnologia em Moçambique.
              Disponibilizamos os mais recentes MacBooks, PC Gaming montados, consolas
              PS5 Pro, smartphones de topo, monitores e óculos inteligentes com garantia oficial e suporte dedicado em Meticais (MZN).
            </p>

            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <span>{STORE_LOCATION}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Hotline & WhatsApp: {WHATSAPP_DISPLAY}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span>{STORE_EMAIL}</span>
              </div>
            </div>

            {/* Newsletter Subscription Box */}
            <div className="pt-2">
              <h5 className="font-bold text-white text-xs mb-2">
                Receba Novidades & Ganhe 10% de Desconto:
              </h5>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  placeholder="O seu e-mail moçambicano..."
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 placeholder-slate-500 outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors flex-shrink-0 shadow-md shadow-blue-600/30"
                >
                  Subscrever
                </button>
              </form>
              <p className="text-[10px] text-slate-500 mt-1">
                Cupão imediato: <code className="text-amber-400">BEMVINDO10</code> no checkout.
              </p>
            </div>
          </div>

          {/* Categorias Tech */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-4 border-l-2 border-blue-500 pl-2">
              Categorias
            </h4>
            <ul className="space-y-2">
              {[
                { name: 'Computadores & Laptops', cat: 'laptops' },
                { name: 'PC Gaming & Desktops', cat: 'pc-gaming' },
                { name: 'Smartphones 5G', cat: 'smartphones' },
                { name: 'PlayStation & Consolas', cat: 'playstation-gaming' },
                { name: 'Óculos Inteligentes & AR', cat: 'smart-glasses' },
                { name: 'Monitores OLED', cat: 'monitors' },
                { name: 'SSDs & Armazenamento', cat: 'storage' },
                { name: 'Acessórios & Gadgets', cat: 'gadgets' },
              ].map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => {
                      setSelectedCategory(item.cat as any);
                      setCurrentPage('shop');
                    }}
                    className="hover:text-blue-400 transition-colors text-left"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Navegação & Apoio */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-4 border-l-2 border-purple-500 pl-2">
              Apoio & Loja
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setCurrentPage('flash-deals')}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1"
                >
                  <span>Promoções Relâmpago</span>
                  <span className="text-[9px] bg-red-600/20 text-red-400 px-1 rounded">HOT</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('new-arrivals')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Lançamentos 2026
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('order-tracking')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Rastrear Encomenda
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('compare')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Comparador de Produtos
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('about')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Sobre a GADGETSZONE
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('contact')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Contactos & Localização
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('faq')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Perguntas Frequentes (FAQ)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('blog')}
                  className="hover:text-blue-400 transition-colors"
                >
                  Blog & Análises Tech
                </button>
              </li>
            </ul>
          </div>

          {/* Políticas & Moçambique */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2">
              Políticas & Termos
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setCurrentPage('policies')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Garantia de 12 Meses
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('policies')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Política de Devoluções
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('policies')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Envios para as Províncias
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('policies')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Termos e Condições
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('policies')}
                  className="hover:text-blue-400 transition-colors text-left"
                >
                  Privacidade & Dados
                </button>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => setCurrentPage('admin')}
                  className="text-purple-400 hover:text-purple-300 font-bold flex items-center gap-1"
                >
                  <span>Portal Administrativo</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* 3. Mozambican Payment Methods Badges */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-semibold mr-2">
              Métodos de Pagamento em Moçambique:
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-bold flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-rose-500" /> M-Pesa Vodacom
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-bold flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-orange-500" /> e-Mola Movitel
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-bold flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-blue-400" /> Rede SIMO / Visa
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-bold flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-emerald-400" /> Millennium BIM / BCI
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 font-bold flex items-center gap-1.5">
              <HandCoins className="w-3.5 h-3.5 text-amber-400" /> Pagar na Entrega
            </span>
          </div>

          <div className="text-slate-500 text-[11px] text-center md:text-right">
            Preços fixados em Meticais (MZN) com IVA incluído.
          </div>
        </div>

        {/* 4. Bottom Copyright */}
        <div className="mt-6 pt-6 border-t border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <div>
            © 2026 GADGETSZONE LDA. Todos os direitos reservados. Maputo, Moçambique. NUIT: 401928310.
          </div>
          <div className="flex items-center gap-4">
            <span>Desenvolvido com foco no consumidor de Moçambique</span>
            <a
              href="https://wa.me/258849900110"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              <span>Suporte Oficial WhatsApp</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
