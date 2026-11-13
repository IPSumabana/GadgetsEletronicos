import React from 'react';
import { Sparkles, ArrowRight, X, Percent } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg bg-white border border-indigo-200 rounded-3xl p-6 sm:p-8 shadow-2xl text-center">
        <button
          onClick={() => setShowAbandonedCartModal(false)}
          className="absolute top-4 right-4 p-2 text-slate-500 hover:text-slate-900 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white">
          <Sparkles className="w-8 h-8 animate-pulse" />
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 mb-3">
          <Percent className="w-3.5 h-3.5" /> Oferta Especial de Retenção
        </span>

        <h3 className="text-2xl font-black text-slate-900 mb-2">
          Não Deixe os Seus Gadgets Para Trás!
        </h3>

        <p className="text-sm text-slate-600 mb-5 leading-relaxed">
          Notámos que ainda tem <strong className="text-slate-900">{cart.length} item(ns)</strong> no seu carrinho no valor de <strong className="text-blue-600">{formatMZN(cartSubtotal)}</strong>. Conclua a sua encomenda agora e oferecemos <strong className="text-amber-600">5% de desconto imediato</strong> com envio prioritário!
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 mb-6 max-h-36 overflow-y-auto space-y-2 text-left">
          {cart.map((item) => (
            <div key={item.product.id} className="flex items-center gap-3 text-xs">
              <img
                src={item.product.images[0]}
                alt={item.product.name}
                className="w-10 h-10 rounded-lg object-cover bg-white border border-slate-200 flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="text-slate-900 font-semibold truncate">
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
            className="flex-1 py-3 px-4 rounded-xl border border-slate-300 hover:border-slate-400 text-slate-600 hover:text-slate-900 text-xs font-semibold transition-colors"
          >
            Continuar a Navegar
          </button>

          <button
            onClick={handleClaimOffer}
            className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all active:scale-95"
          >
            <span>Reclamar Desconto & Finalizar</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
