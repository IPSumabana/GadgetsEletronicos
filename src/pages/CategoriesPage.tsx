import React from 'react';
import { Layers, ArrowRight, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
import { useStore } from '../context/StoreContext';

export const CategoriesPage: React.FC = () => {
  const { setSelectedCategory, setCurrentPage } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-blue-400 bg-blue-950/60 border border-blue-800/60">
          <Layers className="w-3.5 h-3.5" />
          <span>Directório de Tecnologia</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          Explore Todas as Categorias
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Navegue pelas nossas gamas completas de hardware, equipamentos gaming e dispositivos inteligentes disponíveis em Moçambique.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((category) => (
          <div
            key={category.id}
            onClick={() => {
              setSelectedCategory(category.id);
              setCurrentPage('shop');
            }}
            className="group cursor-pointer rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-blue-500/50 p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col justify-between overflow-hidden relative"
          >
            {/* Background Image Preview with Gradient Overlay */}
            <div className="relative h-48 rounded-2xl overflow-hidden bg-slate-950 mb-5 border border-slate-800/80">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <span className="absolute top-3 right-3 bg-slate-900/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-xl border border-slate-700/60">
                {category.productCount} Artigos
              </span>
            </div>

            <div>
              <h2 className="text-xl font-black text-white group-hover:text-blue-400 transition-colors mb-2">
                {category.name}
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                {category.description}
              </p>

              {/* Popular Brands in Category */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {category.popularBrands.map((brand) => (
                  <span
                    key={brand}
                    className="text-[10px] font-medium text-slate-300 bg-slate-950 px-2 py-0.5 rounded-lg border border-slate-800"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-bold text-blue-400 group-hover:text-blue-300">
              <span>Explorar Gama Completa</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
