import React, { useState } from 'react';
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Tag,
  Check,
  X,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatMZN, WHATSAPP_PHONE_NUMBER } from '../utils/formatters';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartSubtotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    setCurrentPage,
  } = useStore();

  const [couponInput, setCouponInput] = useState('');

  const freeShippingThreshold = 50000;
  const isFreeShipping = cartSubtotal >= freeShippingThreshold;
  const freeShippingDifference = Math.max(0, freeShippingThreshold - cartSubtotal);

  const estimatedShipping = isFreeShipping ? 0 : 350;
  const grandTotal = Math.max(0, cartSubtotal - discountAmount + estimatedShipping);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (applyCoupon(couponInput)) {
      setCouponInput('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 shadow-sm">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">
          O seu carrinho está vazio
        </h2>
        <p className="text-sm text-slate-600 max-w-md mx-auto mb-8">
          Explore a nossa colecção de MacBooks, PC Gaming, consolas PS5, smartphones e gadgets com garantia em Moçambique.
        </p>
        <button
          onClick={() => setCurrentPage('shop')}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-blue-600/20 transition-all inline-flex items-center gap-2"
        >
          <span>Ir para a Loja</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          Carrinho de Compras
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Revise os itens selecionados antes de avançar para a entrega e pagamento em Moçambique.
        </p>
      </div>

      {/* Free Shipping Alert Bar */}
      <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs">
        {isFreeShipping ? (
          <div className="flex items-center gap-2 text-emerald-700 font-bold">
            <Check className="w-4 h-4" />
            <span>
              Parabéns! A sua encomenda tem direito a <strong>PORTES GRÁTIS</strong> em Maputo e Matola!
            </span>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-slate-700">
              <span>
                Adicione mais <strong className="text-blue-700">{formatMZN(freeShippingDifference)}</strong> para usufruir de frete grátis em Maputo!
              </span>
              <span className="font-bold text-blue-700">
                {Math.round((cartSubtotal / freeShippingThreshold) * 100)}%
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-blue-100 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(100, (cartSubtotal / freeShippingThreshold) * 100)}%`,
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Cart Layout: Items (8 cols) + Summary (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Items List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-4 sm:p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 text-xs font-semibold text-slate-600">
              <span>Produtos ({cart.length})</span>
              <button
                onClick={clearCart}
                className="text-rose-600 hover:text-rose-700 transition-colors"
              >
                Esvaziar Carrinho
              </button>
            </div>

            <div className="divide-y divide-slate-200">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover bg-slate-50 flex-shrink-0 border border-slate-200"
                    />
                    <div>
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                        {item.product.brand}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 line-clamp-1">
                        {item.product.name}
                      </h3>
                      <div className="text-xs text-slate-600 mt-0.5">
                        {formatMZN(item.product.price)} un.
                      </div>
                      <div className="text-[11px] text-emerald-700 mt-1 flex items-center gap-1 font-medium">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Garantia de {item.product.warrantyMonths} meses</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto gap-4 self-end sm:self-center">
                    {/* Quantity controls */}
                    <div className="flex items-center border border-slate-300 rounded-xl bg-slate-50">
                      <button
                        onClick={() =>
                          updateCartQuantity(item.product.id, item.quantity - 1)
                        }
                        className="px-2.5 py-1 text-slate-600 hover:text-slate-900 font-bold"
                      >
                        -
                      </button>
                      <span className="px-2.5 py-1 text-xs font-bold text-slate-900 min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateCartQuantity(item.product.id, item.quantity + 1)
                        }
                        className="px-2.5 py-1 text-slate-600 hover:text-slate-900 font-bold"
                      >
                        +
                      </button>
                    </div>

                    {/* Total for item */}
                    <div className="text-right min-w-[5rem]">
                      <div className="text-sm font-black text-slate-900">
                        {formatMZN(item.product.price * item.quantity)}
                      </div>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                      title="Remover"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center text-xs">
            <button
              onClick={() => setCurrentPage('shop')}
              className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
            >
              <span>← Continuar a Comprar</span>
            </button>
          </div>
        </div>

        {/* Order Summary Box */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-3xl bg-slate-50 border border-slate-200 shadow-sm p-6 space-y-5">
            <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-200">
              Resumo da Encomenda
            </h3>

            {/* Subtotals breakdown */}
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-700">
                <span>Subtotal ({cart.length} itens):</span>
                <span className="font-bold text-slate-900">{formatMZN(cartSubtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-rose-600 font-medium">
                  <span>Desconto de Cupão ({appliedCoupon?.code}):</span>
                  <span>-{formatMZN(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-700">
                <span>Portes Estimados (Maputo):</span>
                <span className="font-bold text-emerald-700">
                  {estimatedShipping === 0 ? 'Grátis' : formatMZN(estimatedShipping)}
                </span>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                <div>
                  <span className="text-sm font-black text-slate-900 block">Total a Pagar:</span>
                  <span className="text-[10px] text-slate-500">Com impostos incluídos</span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-slate-900 text-right">
                  {formatMZN(grandTotal)}
                </div>
              </div>
            </div>

            {/* Coupon input */}
            <div className="pt-3 border-t border-slate-200">
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                  <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                    <Tag className="w-3.5 h-3.5" />
                    <span>{appliedCoupon.code} (-{appliedCoupon.discountPercent}%)</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-slate-500 hover:text-slate-900"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Código de cupão (Ex: BEMVINDO10)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 uppercase placeholder-slate-400 outline-none focus:border-blue-600"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs transition-colors"
                  >
                    Aplicar
                  </button>
                </form>
              )}
            </div>

            {/* Primary Action: Go to Checkout */}
            <button
              onClick={() => setCurrentPage('checkout')}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98]"
            >
              <span>Avançar para Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Secondary Action: Finish via WhatsApp */}
            <a
              href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(
                `Olá GADGETSZONE! Gostaria de finalizar a minha encomenda com ${cart.length} artigo(s) no total de ${formatMZN(
                  grandTotal
                )}. Podem ajudar-me?`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 font-bold text-xs flex items-center justify-center gap-2 transition-all"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Finalizar pelo WhatsApp</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <div className="pt-2 text-[11px] text-slate-600 space-y-1">
              <div>✓ Pagamento 100% seguro em Meticais</div>
              <div>✓ Opção de pagar apenas no acto da entrega (Maputo/Matola)</div>
              <div>✓ Factura com NUIT incluída</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
