import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  Truck,
  Award,
  Users,
  Building2,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { STORE_LOCATION, WHATSAPP_DISPLAY } from '../utils/formatters';

export const AboutPage: React.FC = () => {
  const { setCurrentPage } = useStore();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12">
      {/* Hero */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-blue-400 bg-blue-950/60 border border-blue-800/60">
          <Sparkles className="w-3.5 h-3.5" />
          <span>A Nossa História & Missão</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Sobre a GADGETSZONE
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed">
          Nascida em Maputo, a GADGETSZONE foi criada com um propósito claro: eliminar as barreiras de acesso à mais alta tecnologia em Moçambique, oferecendo produtos originais, preços justos em Meticais e garantia local sem complicações.
        </p>
      </div>

      {/* Main Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 aspect-video shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
            alt="Equipa GADGETSZONE"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Compromisso com o Mercado Moçambicano
          </h2>
          <p>
            Durante anos, adquirir computadores de alta gama, PC gaming montados ou os últimos smartphones em Moçambique significava lidar com intermediários duvidosos, taxas abusivas de importação e ausência total de suporte pós-venda.
          </p>
          <p>
            Na GADGETSZONE, todos os artigos vêm selados de fábrica com garantia de 12 a 24 meses assegurada diretamente pelo nosso centro de apoio técnico em Maputo, na Polana Cimento.
          </p>
          <div className="pt-2">
            <span className="font-bold text-white block mb-1">Localização Física:</span>
            <span className="text-slate-400">{STORE_LOCATION}</span>
          </div>
        </div>
      </div>

      {/* 4 Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-left space-y-2">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-white text-sm">100% Selado & Original</h3>
          <p className="text-xs text-slate-400">
            Trabalhamos exclusivamente com distribuidores internacionais certificados.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-left space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center">
            <Truck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-white text-sm">Entregas Rápidas</h3>
          <p className="text-xs text-slate-400">
            Estafetas próprios na Grande Maputo e parcerias logísticas para todas as 11 províncias.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-left space-y-2">
          <div className="w-10 h-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-white text-sm">Assistência Técnica Local</h3>
          <p className="text-xs text-slate-400">
            Engenheiros de hardware preparados para montagem, configuração e diagnóstico em Maputo.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-left space-y-2">
          <div className="w-10 h-10 rounded-xl bg-amber-600/20 text-amber-400 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-white text-sm">Suporte Humano WhatsApp</h3>
          <p className="text-xs text-slate-400">
            Atendimento atencioso em português para tirar todas as dúvidas técnicas antes de comprar.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-500/30 text-center space-y-4">
        <h3 className="text-2xl font-black text-white">
          Pronto para elevar o seu setup tecnológico?
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
          Consulte o nosso catálogo completo com mais de 25 equipamentos de referência com stock em Moçambique.
        </p>
        <button
          onClick={() => setCurrentPage('shop')}
          className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-xl shadow-blue-600/30 transition-all inline-flex items-center gap-2"
        >
          <span>Ver Produtos Disponíveis</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
