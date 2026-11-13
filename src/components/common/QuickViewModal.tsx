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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors border border-slate-200"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Media Area */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-slate-200 mb-4">
            <img
              src={quickViewProduct.images[selectedImgIndex] || quickViewProduct.images[0]}
              alt={quickViewProduct.name}
              className="w-full h-full object-cover"
            />
            {quickViewProduct.discountPercentage && (
              <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                -{quickViewProduct.discountPercentage}% OFF
              </span>
            )}
          </div>

          {quickViewProduct.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {quickViewProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImgIndex(idx)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    selectedImgIndex === idx
                      ? 'border-blue-600 shadow-sm'
                      : 'border-slate-200 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-200 text-xs text-slate-600">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Garantia de {quickViewProduct.warrantyMonths} meses</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span>Entrega rápida em Moçambique</span>
            </div>
          </div>
        </div>

        {/* Product Details Area */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto bg-white">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
                {quickViewProduct.categoryName}
              </span>
              <span className="text-xs text-slate-500">SKU: {quickViewProduct.sku}</span>
            </div>

            <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-2 leading-snug">
              {quickViewProduct.name}
            </h2>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1 text-amber-500 text-sm font-semibold">
                <span>★</span>
                <span>{quickViewProduct.rating.toFixed(1)}</span>
                <span className="text-slate-500 text-xs">({quickViewProduct.reviewCount} avaliações)</span>
              </div>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Equipamento 100% Selado & Original
              </span>
            </div>

            <div className="flex items-baseline gap-3 mb-5 p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-2xl md:text-3xl font-extrabold text-slate-900">
                {formatMZN(quickViewProduct.price)}
              </span>
              {quickViewProduct.oldPrice && (
                <span className="text-sm text-slate-400 line-through">
                  {formatMZN(quickViewProduct.oldPrice)}
                </span>
              )}
            </div>

            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              {quickViewProduct.shortDescription}
            </p>

            {Object.keys(quickViewProduct.specifications).length > 0 && (
              <div className="mb-6 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                <h4 className="font-semibold text-slate-800 mb-2">Especificações Principais:</h4>
                <div className="space-y-1">
                  {Object.entries(quickViewProduct.specifications)
                    .slice(0, 3)
                    .map(([key, val]) => (
                      <div key={key} className="flex justify-between gap-2 text-slate-600">
                        <span className="text-slate-500">{key}:</span>
                        <span className="font-medium text-slate-900 text-right">{val}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden bg-slate-50">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-slate-700 hover:text-slate-900 hover:bg-slate-200 transition-colors"
                >
                  -
                </button>
                <span className="px-3 py-2 text-sm font-bold text-slate-900 min-w-[2.5rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity((q) => Math.min(quickViewProduct.stock, q + 1))
                  }
                  className="px-3 py-2 text-slate-700 hover:text-slate-900 hover:bg-slate-200 transition-colors"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={quickViewProduct.stock <= 0}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 transition-all active:scale-[0.98]"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Adicionar ao Carrinho</span>
              </button>

              <button
                onClick={() => toggleWishlist(quickViewProduct.id)}
                className={`p-3 rounded-xl border transition-all ${
                  isFavorite
                    ? 'bg-rose-50 border-rose-200 text-rose-600'
                    : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-rose-600'
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
                className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 transition-colors"
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
                className="text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1"
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
