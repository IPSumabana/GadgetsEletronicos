import React, { useState, useEffect } from 'react';
import { Flame, Clock, Sparkles, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';

export const FlashDealsPage: React.FC = () => {
  const { products, setCurrentPage } = useStore();

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
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-red-950/60 via-slate-900 to-slate-950 border border-red-900/50 p-6 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-red-300 bg-red-950 border border-red-800">
            <Flame className="w-3.5 h-3.5 animate-bounce text-red-400" />
            <span>Preços Especiais por Tempo Limitado</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Promoções & Ofertas Relâmpago
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            Aproveite descontos exclusivos em Meticais (MZN) em MacBooks, PC Gaming, consolas e periféricos. Stock limitado em Maputo.
          </p>
        </div>

        {/* Big Countdown Box */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-red-900/40 text-center flex-shrink-0">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-center gap-1">
            <Clock className="w-3.5 h-3.5 text-red-400" />
            <span>As ofertas encerram em:</span>
          </div>
          <div className="flex items-center justify-center gap-2 font-mono font-black text-xl sm:text-2xl text-white">
            <div className="bg-slate-900 px-3 py-2 rounded-xl border border-slate-800">
              {String(timeLeft.hours).padStart(2, '0')}
              <span className="block text-[9px] font-sans font-medium text-slate-500">Horas</span>
            </div>
            <span>:</span>
            <div className="bg-slate-900 px-3 py-2 rounded-xl border border-slate-800">
              {String(timeLeft.minutes).padStart(2, '0')}
              <span className="block text-[9px] font-sans font-medium text-slate-500">Min</span>
            </div>
            <span>:</span>
            <div className="bg-slate-900 px-3 py-2 rounded-xl border border-slate-800 text-red-400">
              {String(timeLeft.seconds).padStart(2, '0')}
              <span className="block text-[9px] font-sans font-medium text-slate-500">Seg</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Deals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {dealProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};
