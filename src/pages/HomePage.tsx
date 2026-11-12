import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  Flame,
  ShieldCheck,
  Truck,
  Zap,
  Clock,
  Check,
  Star,
  Layers,
  ChevronRight,
  Cpu,
  Glasses,
  Laptop,
  Gamepad2,
  Camera,
  Smartphone,
  ExternalLink,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';
import { CATEGORIES } from '../data/mockData';
import { formatMZN, WHATSAPP_DISPLAY } from '../utils/formatters';

export const HomePage: React.FC = () => {
  const { products, setCurrentPage, setSelectedCategory, navigateToProduct } = useStore();

  // Flash deals countdown timer (hours, minutes, seconds)
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 42,
    seconds: 18,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 8);
  const flashDealProducts = products.filter((p) => p.isFlashDeal || p.discountPercentage);
  const smartGlassesProducts = products.filter((p) => p.category === 'smart-glasses');
  const gamingProducts = products.filter(
    (p) => p.category === 'pc-gaming' || p.category === 'playstation-gaming'
  );

  return (
    <div className="space-y-16 pb-12">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 px-4 sm:px-6">
        {/* Futuristic glowing backdrop */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-blue-600/20 via-indigo-600/15 to-purple-600/20 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-blue-950/40 border border-slate-800/80 p-8 sm:p-12 lg:p-16 shadow-2xl overflow-hidden">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.08]" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/30 text-blue-400 text-xs font-bold tracking-wide">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-spin" />
                  <span>A Maior Loja de Tecnologia de Moçambique</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                  O Futuro Chegou a{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
                    Moçambique.
                  </span>
                </h1>

                <p className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed">
                  Laptops Apple M3, torres PC Gaming com RTX 4080, consolas PS5 Pro,
                  óculos inteligentes Ray-Ban Meta e periféricos de alta performance. Preços
                  em Meticais (MZN) com garantia nacional de 12 meses.
                </p>

                {/* Hero CTA Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => setCurrentPage('shop')}
                    className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm flex items-center gap-2.5 shadow-xl shadow-blue-600/30 active:scale-95 transition-all"
                  >
                    <span>Explorar Todos os Produtos</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setCurrentPage('flash-deals')}
                    className="px-6 py-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 hover:text-white font-bold text-sm flex items-center gap-2 transition-all"
                  >
                    <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span>Ofertas Relâmpago</span>
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800 text-xs text-slate-300">
                  <div>
                    <div className="text-lg sm:text-xl font-black text-white">5.000+</div>
                    <div className="text-slate-400 text-[11px]">Clientes em Moçambique</div>
                  </div>
                  <div>
                    <div className="text-lg sm:text-xl font-black text-white">24 Horas</div>
                    <div className="text-slate-400 text-[11px]">Entrega Maputo & Matola</div>
                  </div>
                  <div>
                    <div className="text-lg sm:text-xl font-black text-white">100% Selado</div>
                    <div className="text-slate-400 text-[11px]">Garantia Oficial 12M</div>
                  </div>
                </div>
              </div>

              {/* Hero Showcase Card */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-3xl bg-gradient-to-b from-slate-800/70 to-slate-900/90 border border-blue-500/30 p-6 shadow-2xl backdrop-blur-xl">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2.5 py-1 rounded-full">
                      Destaque da Semana
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">
                      Stock em Maputo
                    </span>
                  </div>

                  <div
                    onClick={() => navigateToProduct('gz-prod-007')}
                    className="cursor-pointer group"
                  >
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 mb-4 relative">
                      <img
                        src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80"
                        alt="Ray-Ban Meta"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute bottom-3 left-3 bg-blue-600/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
                        Nova Geração
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">
                      Óculos Inteligentes com Câmara
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors mb-2">
                      Ray-Ban Meta Wayfarer (Câmara 12MP & Áudio)
                    </h3>

                    <div className="flex items-baseline justify-between pt-2 border-t border-slate-800">
                      <div>
                        <div className="text-xl font-black text-white">
                          {formatMZN(29500)}
                        </div>
                        <div className="text-xs text-slate-500 line-through">
                          {formatMZN(34000)}
                        </div>
                      </div>
                      <span className="text-xs font-bold text-blue-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>Ver Detalhes</span>
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Categorias Populares */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-400" />
              <span>Categorias em Destaque</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Encontre exactamente o que procura para o seu setup de produtividade ou entretenimento.
            </p>
          </div>
          <button
            onClick={() => setCurrentPage('categories')}
            className="text-xs sm:text-sm font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
          >
            <span>Ver Todas</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {CATEGORIES.slice(0, 6).map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setCurrentPage('shop');
              }}
              className="group cursor-pointer p-4 rounded-2xl bg-slate-900/50 hover:bg-slate-900 border border-slate-800/80 hover:border-blue-500/50 transition-all duration-300 text-center flex flex-col items-center justify-between shadow-lg hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-blue-400 group-hover:text-white group-hover:bg-blue-600 transition-all mb-3 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-transform"
                />
              </div>
              <h3 className="font-bold text-white text-xs sm:text-sm group-hover:text-blue-400 transition-colors line-clamp-1">
                {cat.name}
              </h3>
              <span className="text-[10px] text-slate-500 mt-1">
                {cat.productCount} Produtos
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Ofertas Relâmpago com Contagem Regressiva */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="rounded-3xl bg-gradient-to-r from-red-950/40 via-slate-900 to-slate-950 border border-red-900/40 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-red-600 text-white shadow-lg shadow-red-600/30">
                <Flame className="w-6 h-6 animate-bounce" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-black text-white">
                    Ofertas Relâmpago
                  </h2>
                  <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                    Ao Vivo
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Descontos por tempo limitado com entrega prioritária em Moçambique.
                </p>
              </div>
            </div>

            {/* Countdown Clock */}
            <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-950/80 border border-red-900/30 px-4 py-2 rounded-2xl">
              <Clock className="w-4 h-4 text-red-400" />
              <span className="text-xs text-slate-400 mr-1">Termina em:</span>
              <div className="flex items-center gap-1 font-mono font-bold text-sm text-white">
                <span className="bg-slate-900 px-2 py-1 rounded-lg border border-slate-800">
                  {String(timeLeft.hours).padStart(2, '0')}h
                </span>
                <span>:</span>
                <span className="bg-slate-900 px-2 py-1 rounded-lg border border-slate-800">
                  {String(timeLeft.minutes).padStart(2, '0')}m
                </span>
                <span>:</span>
                <span className="bg-slate-900 px-2 py-1 rounded-lg border border-slate-800 text-red-400">
                  {String(timeLeft.seconds).padStart(2, '0')}s
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {flashDealProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Destaque Especial: PC Gaming & PlayStation 5 Pro */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Banner 1: PC Gaming Custom */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950 border border-blue-500/30 p-8 shadow-xl flex flex-col justify-between">
            <div className="space-y-3 z-10">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-950/80 px-2.5 py-1 rounded-full border border-blue-800/40">
                Setup de Sonho
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                PC Gaming Montados & Placas RTX 4000
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md">
                Torres equipadas com refrigeração líquida, processadores Ryzen 9 e Intel Core Ultra. Montagem e testes de stress realizados em Maputo com garantia de 2 anos.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-800 flex items-center justify-between z-10">
              <div>
                <span className="text-[11px] text-slate-400">A partir de</span>
                <div className="text-xl font-black text-white">{formatMZN(68000)}</div>
              </div>
              <button
                onClick={() => {
                  setSelectedCategory('pc-gaming');
                  setCurrentPage('shop');
                }}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all"
              >
                <span>Ver Todos os PCs</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Banner 2: PS5 Pro & Consolas */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border border-purple-500/30 p-8 shadow-xl flex flex-col justify-between">
            <div className="space-y-3 z-10">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-950/80 px-2.5 py-1 rounded-full border border-purple-800/40">
                Nova Geração
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                Sony PlayStation 5 Pro 2TB SSD
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md">
                Ray Tracing avançado a 60-120fps e super resolução por IA (PSSR). Comandos DualSense Edge e auscultadores Pulse 3D com stock imediato.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-800 flex items-center justify-between z-10">
              <div>
                <span className="text-[11px] text-slate-400">Preço Especial</span>
                <div className="text-xl font-black text-white">{formatMZN(62000)}</div>
              </div>
              <button
                onClick={() => {
                  setSelectedCategory('playstation-gaming');
                  setCurrentPage('shop');
                }}
                className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-purple-600/30 transition-all"
              >
                <span>Ver Consolas & Jogos</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Mais Vendidos & Recomendados */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Os Mais Populares em Moçambique
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Equipamentos de topo com maior procura entre profissionais e entusiastas.
            </p>
          </div>
          <button
            onClick={() => setCurrentPage('shop')}
            className="text-xs sm:text-sm font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
          >
            <span>Ver Catálogo Completo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. Porquê Comprar na GADGETSZONE (Foco Moçambique) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-8 sm:p-12">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Compromisso & Confiança
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Porquê a GADGETSZONE é a Escolha Nº 1?
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Comprar tecnologia cara requer garantias reais, assistência pós-venda presente e segurança nos pagamentos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800 text-left">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-base mb-2">
                Garantia Real de 12 a 24 Meses
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Todos os equipamentos são novos, originais e selados de fábrica. Em caso de anomalia, oferecemos reparação ou substituição imediata em Maputo.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800 text-left">
              <div className="w-12 h-12 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-base mb-2">
                Pagamento Fácil em Meticais (MZN)
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pague directamente por M-Pesa, e-Mola, Cartão na Rede SIMO ou por transferência bancária sem taxas de câmbio ocultas de moeda estrangeira.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950/70 border border-slate-800 text-left">
              <div className="w-12 h-12 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center mb-4">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-base mb-2">
                Cobertura Nacional em Moçambique
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Entregas no próprio dia na Grande Maputo e envios diários seguros via transportadora para Beira, Nampula, Tete, Pemba e outras capitais.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. WhatsApp Quick Order Banner */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-950/50 via-slate-900 to-emerald-950/30 border border-emerald-800/40 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-emerald-600/30">
              <Zap className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Prefere Encomendar ou Tirar Dúvidas pelo WhatsApp?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                A nossa equipa comercial responde em menos de 5 minutos: <strong className="text-emerald-400">{WHATSAPP_DISPLAY}</strong>
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/258849900110?text=Ol%C3%A1%20GADGETSZONE!%20Gostaria%20de%20consultar%20a%20disponibilidade%20de%20produtos."
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all flex-shrink-0"
          >
            <span>Iniciar Conversa Agora</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
};
