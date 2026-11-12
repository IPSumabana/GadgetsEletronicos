import React from 'react';
import { Sparkles, ShoppingBag, ArrowRight, X, Percent } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatMZN } from '../../utils/formatters';

export const AbandonedCartModal: React.FC = () => {
  const {
    showAbandonedCartModal,
    setShowAbandonedCartModal,
    cart,
    cartSubtotal,
    setCurrentPage,
    applyCoupon,
  } = useStore();

  if (!showAbandonedCartModal || cart.length === 0) return null;

  const handleClaimOffer = () => {
    applyCoupon('GADGETS5');
    setShowAbandonedCartModal(false);
    setCurrentPage('checkout');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 to-slate-950 border border-indigo-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-indigo-500/20 text-center">
        <button
          onClick={() => setShowAbandonedCartModal(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/60 hover:bg-slate-700 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/30 text-white">
          <Sparkles className="w-8 h-8 animate-pulse" />
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-amber-300 bg-amber-950/60 border border-amber-800/60 mb-3">
          <Percent className="w-3.5 h-3.5" /> Oferta Especial de Retenção
        </span>

        <h3 className="text-2xl font-black text-white mb-2">
          Não Deixe os Seus Gadgets Para Trás!
        </h3>

        <p className="text-sm text-slate-300 mb-5 leading-relaxed">
          Notámos que ainda tem <strong className="text-white">{cart.length} item(ns)</strong> no seu carrinho no valor de <strong className="text-blue-400">{formatMZN(cartSubtotal)}</strong>. Conclua a sua encomenda agora e oferecemos <strong className="text-amber-400">5% de desconto imediato</strong> com envio prioritário!
        </p>

        {/* Cart Preview snippet */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-3 mb-6 max-h-36 overflow-y-auto space-y-2 text-left">
          {cart.map((item) => (
            <div key={item.product.id} className="flex items-center gap-3 text-xs">
              <img
                src={item.product.images[0]}
                alt={item.product.name}
                className="w-10 h-10 rounded-lg object-cover bg-slate-900 flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="text-slate-200 font-semibold truncate">
                  {item.product.name}
                </div>
                <div className="text-slate-500">
                  {item.quantity}x {formatMZN(item.product.price)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setShowAbandonedCartModal(false)}
            className="flex-1 py-3 px-4 rounded-xl border border-slate-700 hover:border-slate-600 text-slate-400 hover:text-white text-xs font-semibold transition-colors"
          >
            Continuar a Navegar
          </button>

          <button
            onClick={handleClaimOffer}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
          >
            <span>Reclamar Desconto & Finalizar</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
