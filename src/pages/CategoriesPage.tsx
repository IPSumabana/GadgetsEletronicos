import React from 'react';
import { Layers, ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
import { useStore } from '../context/StoreContext';

export const CategoriesPage: React.FC = () => {
  const { setSelectedCategory, setCurrentPage } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200">
          <Layers className="w-3.5 h-3.5" />
          <span>Directório de Tecnologia</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          Explore Todas as Categorias
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Navegue pelas nossas gamas completas de hardware, equipamentos gaming e dispositivos inteligentes disponíveis em Moçambique.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CATEGORIES.map((category) => (
          <div
            key={category.id}
            onClick={() => {
              setSelectedCategory(category.id);
              setCurrentPage('shop');
            }}
            className="group cursor-pointer rounded-3xl bg-white border border-slate-200 hover:border-blue-400 p-6 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between overflow-hidden relative"
          >
            <div className="relative h-48 rounded-2xl overflow-hidden bg-slate-100 mb-5 border border-slate-100">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <span className="absolute top-3 right-3 bg-white/95 backdrop-blur-md text-slate-900 text-[11px] font-bold px-2.5 py-1 rounded-xl border border-slate-200 shadow-sm">
                {category.productCount} Artigos
              </span>
            </div>

            <div>
              <h2 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                {category.name}
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {category.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {category.popularBrands.map((brand) => (
                  <span
                    key={brand}
                    className="text-[10px] font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-700">
              <span>Explorar Gama Completa</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
