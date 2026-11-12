import React from 'react';
import {
  Heart,
  ShoppingCart,
  Eye,
  SlidersHorizontal,
  Check,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';
import { formatMZN, generateWhatsAppOrderLink } from '../../utils/formatters';

interface ProductCardProps {
  product: Product;
  variant?: 'grid' | 'horizontal';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  variant = 'grid',
}) => {
  const {
    navigateToProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    addToCompare,
    removeFromCompare,
    isInCompare,
    setQuickViewProduct,
  } = useStore();

  const isFavorite = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);
  const isOutOfStock = product.stock <= 0;

  if (variant === 'horizontal') {
    return (
      <div className="group relative flex flex-col sm:flex-row bg-slate-900/60 border border-slate-800/80 hover:border-blue-500/50 rounded-2xl p-4 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 backdrop-blur-sm">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {product.discountPercentage && (
            <span className="bg-gradient-to-r from-red-600 to-rose-500 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-md">
              -{product.discountPercentage}%
            </span>
          )}
          {product.isNew && (
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-md">
              Novo
            </span>
          )}
        </div>

        {/* Image */}
        <div
          onClick={() => navigateToProduct(product.id)}
          className="relative sm:w-56 h-48 sm:h-auto rounded-xl overflow-hidden bg-slate-950 flex-shrink-0 cursor-pointer group-hover:scale-[1.02] transition-transform duration-300"
        >
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setQuickViewProduct(product);
              }}
              title="Vista Rápida"
              className="p-2.5 rounded-xl bg-slate-900/90 text-slate-200 hover:text-white hover:bg-blue-600 transition-colors shadow-lg"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between sm:pl-5 pt-4 sm:pt-0">
          <div>
            <div className="flex items-center justify-between gap-2 text-xs text-slate-400 mb-1">
              <span className="font-semibold text-blue-400 uppercase tracking-wider text-[11px]">
                {product.brand}
              </span>
              <span className="flex items-center gap-1 text-amber-400 font-medium">
                ★ {product.rating.toFixed(1)} ({product.reviewCount})
              </span>
            </div>

            <h3
              onClick={() => navigateToProduct(product.id)}
              className="text-base font-bold text-white hover:text-blue-400 cursor-pointer line-clamp-2 transition-colors mb-2"
            >
              {product.name}
            </h3>

            <p className="text-xs text-slate-400 line-clamp-2 mb-3">
              {product.shortDescription}
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
              <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-800/40">
                <ShieldCheck className="w-3 h-3" /> {product.warrantyMonths} Meses Garantia
              </span>
              {product.stock > 0 ? (
                <span className="text-slate-400 font-medium">
                  {product.stock <= 4 ? (
                    <span className="text-amber-400">Apenas {product.stock} em stock!</span>
                  ) : (
                    'Disponível em Stock'
                  )}
                </span>
              ) : (
                <span className="text-rose-400">Esgotado</span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
            <div>
              <div className="text-xl font-extrabold text-white tracking-tight">
                {formatMZN(product.price)}
              </div>
              {product.oldPrice && (
                <div className="text-xs text-slate-500 line-through">
                  {formatMZN(product.oldPrice)}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-2.5 rounded-xl border transition-all ${
                  isFavorite
                    ? 'bg-rose-500/20 border-rose-500/50 text-rose-400'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-rose-400'
                }`}
                title="Favoritos"
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
              </button>

              <button
                onClick={() => (isCompared ? removeFromCompare(product.id) : addToCompare(product.id))}
                className={`p-2.5 rounded-xl border transition-all ${
                  isCompared
                    ? 'bg-blue-600/20 border-blue-500 text-blue-400'
                    : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-blue-400'
                }`}
                title="Comparar"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>

              <button
                disabled={isOutOfStock}
                onClick={() => addToCart(product)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs tracking-wide transition-all duration-200 ${
                  isOutOfStock
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/30 active:scale-95'
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Adicionar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative flex flex-col justify-between bg-slate-900/60 border border-slate-800/80 hover:border-blue-500/50 rounded-2xl p-4 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 backdrop-blur-sm">
      {/* Top badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
        {product.discountPercentage && (
          <span className="bg-gradient-to-r from-red-600 to-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">
            -{product.discountPercentage}%
          </span>
        )}
        {product.isFlashDeal && (
          <span className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md flex items-center gap-0.5">
            <Zap className="w-2.5 h-2.5 fill-white" /> Relâmpago
          </span>
        )}
        {product.isNew && !product.discountPercentage && (
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-md">
            Novo
          </span>
        )}
      </div>

      {/* Floating Action Buttons */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`p-2 rounded-xl border backdrop-blur-md transition-all shadow-md ${
            isFavorite
              ? 'bg-rose-500/20 border-rose-500/60 text-rose-400'
              : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-rose-400 hover:bg-slate-900'
          }`}
          title={isFavorite ? 'Remover dos Favoritos' : 'Guardar nos Favoritos'}
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-rose-500' : ''}`} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            isCompared ? removeFromCompare(product.id) : addToCompare(product.id);
          }}
          className={`p-2 rounded-xl border backdrop-blur-md transition-all shadow-md ${
            isCompared
              ? 'bg-blue-600/20 border-blue-500 text-blue-400'
              : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:text-blue-400 hover:bg-slate-900'
          }`}
          title={isCompared ? 'Remover da Comparação' : 'Comparar Produto'}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Product Image Area */}
      <div
        onClick={() => navigateToProduct(product.id)}
        className="relative w-full h-48 rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center cursor-pointer mb-3"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="w-full py-1.5 px-3 rounded-lg bg-slate-900/90 text-white text-xs font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-1.5 shadow-lg border border-slate-700/60"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Espreitar</span>
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div>
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="font-semibold text-blue-400 uppercase tracking-wider text-[10px]">
            {product.brand}
          </span>
          <div className="flex items-center gap-1 text-amber-400 font-semibold text-[11px]">
            <span>★</span>
            <span>{product.rating.toFixed(1)}</span>
            <span className="text-slate-500 text-[10px]">({product.reviewCount})</span>
          </div>
        </div>

        <h3
          onClick={() => navigateToProduct(product.id)}
          className="text-sm font-bold text-white hover:text-blue-400 cursor-pointer line-clamp-2 transition-colors min-h-[2.5rem] leading-snug mb-1.5"
        >
          {product.name}
        </h3>

        <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-3">
          <span className="inline-flex items-center gap-1 text-slate-300">
            <ShieldCheck className="w-3 h-3 text-emerald-400" /> {product.warrantyMonths}M Garantia
          </span>
          <span>•</span>
          <span className={product.stock <= 3 ? 'text-amber-400 font-medium' : 'text-slate-400'}>
            {product.stock <= 3 ? `Só ${product.stock} restam!` : 'Em Stock'}
          </span>
        </div>
      </div>

      {/* Pricing & CTA */}
      <div className="pt-2 border-t border-slate-800/80">
        <div className="flex items-baseline justify-between mb-3">
          <div>
            <div className="text-lg font-black text-white tracking-tight">
              {formatMZN(product.price)}
            </div>
            {product.oldPrice && (
              <div className="text-[11px] text-slate-500 line-through">
                {formatMZN(product.oldPrice)}
              </div>
            )}
          </div>
          <a
            href={generateWhatsAppOrderLink(product.name, product.price, product.sku)}
            target="_blank"
            rel="noopener noreferrer"
            title="Pedir ou Negociar via WhatsApp"
            className="text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 bg-emerald-950/40 border border-emerald-800/40 px-2 py-1 rounded-lg transition-colors"
          >
            WhatsApp
          </a>
        </div>

        <div className="grid grid-cols-1 gap-2">
          <button
            disabled={isOutOfStock}
            onClick={() => addToCart(product)}
            className={`w-full py-2.5 px-3 rounded-xl font-semibold text-xs tracking-wide flex items-center justify-center gap-2 transition-all duration-200 ${
              isOutOfStock
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-600/25 active:scale-[0.98]'
            }`}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Adicionar ao Carrinho</span>
          </button>
        </div>
      </div>
    </div>
  );
};
