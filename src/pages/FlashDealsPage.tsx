import React, { useState, useEffect } from 'react';
import { Flame, Clock } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';

export const FlashDealsPage: React.FC = () => {
  const { products } = useStore();

  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 42,
    seconds: 18,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dealProducts = products.filter(
    (p) => p.isFlashDeal || (p.discountPercentage && p.discountPercentage > 0)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="rounded-3xl bg-gradient-to-r from-rose-50 via-white to-orange-50 border border-rose-200 p-6 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-red-700 bg-red-100 border border-red-200">
            <Flame className="w-3.5 h-3.5 animate-bounce text-red-600" />
            <span>Preços Especiais por Tempo Limitado</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
            Promoções & Ofertas Relâmpago
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
            Aproveite descontos exclusivos em Meticais (MZN) em MacBooks, PC Gaming, consolas e periféricos. Stock limitado em Maputo.
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-rose-200 text-center flex-shrink-0 shadow-xs">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center justify-center gap-1">
            <Clock className="w-3.5 h-3.5 text-red-600" />
            <span>As ofertas encerram em:</span>
          </div>
          <div className="flex items-center justify-center gap-2 font-mono font-black text-xl sm:text-2xl text-slate-900">
            <div className="bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
              {String(timeLeft.hours).padStart(2, '0')}
              <span className="block text-[9px] font-sans font-medium text-slate-500">Horas</span>
            </div>
            <span>:</span>
            <div className="bg-slate-50 px-3 py-2 rounded-xl border border-slate-200">
              {String(timeLeft.minutes).padStart(2, '0')}
              <span className="block text-[9px] font-sans font-medium text-slate-500">Min</span>
            </div>
            <span>:</span>
            <div className="bg-red-50 px-3 py-2 rounded-xl border border-red-200 text-red-600">
              {String(timeLeft.seconds).padStart(2, '0')}
              <span className="block text-[9px] font-sans font-medium text-red-500">Seg</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {dealProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};
