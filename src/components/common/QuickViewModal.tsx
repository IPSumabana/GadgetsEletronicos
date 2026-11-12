import React, { useState } from 'react';
import {
  X,
  ShoppingCart,
  Heart,
  ShieldCheck,
  Check,
  Truck,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { formatMZN, generateWhatsAppOrderLink } from '../../utils/formatters';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    navigateToProduct,
    toggleWishlist,
    isInWishlist,
  } = useStore();

  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const isFavorite = isInWishlist(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors border border-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Media Area */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between bg-slate-950/60 border-b md:border-b-0 md:border-r border-slate-800">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/80 mb-4">
            <img
              src={quickViewProduct.images[selectedImgIndex] || quickViewProduct.images[0]}
              alt={quickViewProduct.name}
              className="w-full h-full object-cover"
            />
            {quickViewProduct.discountPercentage && (
              <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
                -{quickViewProduct.discountPercentage}% OFF
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {quickViewProduct.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {quickViewProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImgIndex(idx)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    selectedImgIndex === idx
                      ? 'border-blue-500 shadow-md shadow-blue-500/30'
                      : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Value Badges */}
          <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-800 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Garantia de {quickViewProduct.warrantyMonths} meses</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <span>Entrega rápida em Moçambique</span>
            </div>
          </div>
        </div>

        {/* Product Details Area */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-950/40 border border-blue-800/40 px-2.5 py-0.5 rounded-full">
                {quickViewProduct.categoryName}
              </span>
              <span className="text-xs text-slate-400">SKU: {quickViewProduct.sku}</span>
            </div>

            <h2 className="text-xl md:text-2xl font-black text-white mb-2 leading-snug">
              {quickViewProduct.name}
            </h2>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1 text-amber-400 text-sm font-semibold">
                <span>★</span>
                <span>{quickViewProduct.rating.toFixed(1)}</span>
                <span className="text-slate-400 text-xs">({quickViewProduct.reviewCount} avaliações)</span>
              </div>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Equipamento 100% Selado & Original
              </span>
            </div>

            <div className="flex items-baseline gap-3 mb-5 p-3 rounded-xl bg-slate-950/50 border border-slate-800">
              <span className="text-2xl md:text-3xl font-extrabold text-white">
                {formatMZN(quickViewProduct.price)}
              </span>
              {quickViewProduct.oldPrice && (
                <span className="text-sm text-slate-500 line-through">
                  {formatMZN(quickViewProduct.oldPrice)}
                </span>
              )}
            </div>

            <p className="text-sm text-slate-300 mb-6 leading-relaxed">
              {quickViewProduct.shortDescription}
            </p>

            {/* Quick Specs Highlight */}
            {Object.keys(quickViewProduct.specifications).length > 0 && (
              <div className="mb-6 p-3 rounded-xl bg-slate-950/40 border border-slate-800/80 text-xs">
                <h4 className="font-semibold text-slate-300 mb-2">Especificações Principais:</h4>
                <div className="space-y-1">
                  {Object.entries(quickViewProduct.specifications)
                    .slice(0, 3)
                    .map(([key, val]) => (
                      <div key={key} className="flex justify-between gap-2 text-slate-400">
                        <span className="text-slate-500">{key}:</span>
                        <span className="font-medium text-slate-300 text-right">{val}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          <div>
            {/* Actions */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center border border-slate-700 rounded-xl overflow-hidden bg-slate-950">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  -
                </button>
                <span className="px-3 py-2 text-sm font-bold text-white min-w-[2.5rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity((q) => Math.min(quickViewProduct.stock, q + 1))
                  }
                  className="px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={quickViewProduct.stock <= 0}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all active:scale-[0.98]"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Adicionar ao Carrinho</span>
              </button>

              <button
                onClick={() => toggleWishlist(quickViewProduct.id)}
                className={`p-3 rounded-xl border transition-all ${
                  isFavorite
                    ? 'bg-rose-500/20 border-rose-500 text-rose-400'
                    : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-rose-400'
                }`}
                title="Favoritos"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-500' : ''}`} />
              </button>
            </div>

            <div className="flex items-center justify-between gap-3 text-xs">
              <button
                onClick={() => {
                  setQuickViewProduct(null);
                  navigateToProduct(quickViewProduct.id);
                }}
                className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 transition-colors"
              >
                <span>Ver página com detalhes completos</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={generateWhatsAppOrderLink(
                  quickViewProduct.name,
                  quickViewProduct.price,
                  quickViewProduct.sku
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
              >
                <span>Negociar no WhatsApp</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
