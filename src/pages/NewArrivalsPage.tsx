import React from 'react';
import { Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';

export const NewArrivalsPage: React.FC = () => {
  const { products } = useStore();

  const newProducts = products.filter((p) => p.isNew || p.tags.includes('apple') || p.tags.includes('ps5 pro'));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="rounded-3xl bg-gradient-to-r from-blue-50 via-white to-indigo-50 border border-blue-200 p-6 sm:p-10 space-y-3 shadow-sm">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-blue-700 bg-blue-100 border border-blue-200">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Lançamentos Tecnológicos de 2026</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
          Novidades & Últimos Lançamentos
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
          Seja o primeiro em Moçambique a testar os dispositivos mais aguardados do mundo: MacBook M3 Max, Ray-Ban Meta Wayfarer, PlayStation 5 Pro e drones de última geração.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {newProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};
