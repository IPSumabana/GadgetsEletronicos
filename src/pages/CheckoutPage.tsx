import React, { useState } from 'react';
import {
  ShieldCheck,
  ArrowRight,
  Lock,
  ChevronLeft,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import {
  MOZAMBIQUE_PROVINCES,
  PAYMENT_METHODS_DATA,
} from '../data/mockData';
import { formatMZN } from '../utils/formatters';
import { DeliveryMethod, PaymentMethod } from '../types';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    discountAmount,
    appliedCoupon,
    createOrder,
    setCurrentPage,
    currentUser,
    showToast,
  } = useStore();

  // Form State
  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '+258 84 ');
  const [province, setProvince] = useState(currentUser?.address?.province || 'Maputo Cidade');
  const [city, setCity] = useState(currentUser?.address?.city || 'Polana');
  const [address, setAddress] = useState(currentUser?.address?.street || '');
  const [notes, setNotes] = useState('');

  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('express_maputo');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('mpesa');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate Shipping fee based on province and delivery method
  const provinceData =
    MOZAMBIQUE_PROVINCES.find((p) => p.name === province) || MOZAMBIQUE_PROVINCES[0];

  let shippingFee = 0;
  if (deliveryMethod === 'levantamento_loja') {
    shippingFee = 0;
  } else if (deliveryMethod === 'express_maputo') {
    shippingFee = provinceData.expressAvailable ? (cartSubtotal >= 50000 ? 0 : 350) : 600;
  } else {
    shippingFee = provinceData.standardFee;
  }

  const grandTotal = Math.max(0, cartSubtotal - discountAmount + shippingFee);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim() || !email.trim() || !phone.trim() || !address.trim()) {
      showToast('Por favor preencha todos os campos obrigatórios da morada.', 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const order = createOrder({
        customerName,
        email,
        phone,
        province,
        city,
        address,
        deliveryMethod,
        paymentMethod,
        items: cart,
        subtotal: cartSubtotal,
        shippingFee,
        discountAmount,
        couponCode: appliedCoupon?.code,
        total: grandTotal,
        status: 'pendente',
        paymentStatus: 'pendente',
        notes,
        estimatedDelivery: provinceData.estimatedDays,
      });

      setIsSubmitting(false);
      showToast(`Encomenda #${order.id} criada com sucesso!`, 'success');
      setCurrentPage('order-confirmation');
    }, 600);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-slate-900 mb-4">
          Não existem produtos no carrinho para finalizar.
        </h2>
        <button
          onClick={() => setCurrentPage('shop')}
          className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
        >
          Voltar para a Loja
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Back button and page title */}
      <div>
        <button
          onClick={() => setCurrentPage('cart')}
          className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 mb-2 transition-colors font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Voltar ao Carrinho</span>
        </button>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 flex flex-wrap items-center gap-3">
          <span>Finalizar Encomenda</span>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full flex items-center gap-1">
            <Lock className="w-3.5 h-3.5" /> Checkout Seguro Moçambique
          </span>
        </h1>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: Details (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Contact Information */}
          <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-200">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">
                1
              </span>
              <span>Informações de Contacto</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Armando Guambe"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-blue-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  E-mail *
                </label>
                <input
                  type="email"
                  required
                  placeholder="seuemail@exemplo.co.mz"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-blue-600 focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Telemóvel / WhatsApp em Moçambique *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+258 84 123 4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-blue-600 focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Shipping Address in Mozambique */}
          <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-200">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">
                2
              </span>
              <span>Morada de Entrega em Moçambique</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Província *
                </label>
                <select
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 outline-none focus:border-blue-600 focus:bg-white"
                >
                  {MOZAMBIQUE_PROVINCES.map((p) => (
                    <option key={p.name} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Cidade / Bairro *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Polana, Matola Rio, Beira..."
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-blue-600 focus:bg-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Endereço & Ponto de Referência *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Av. Julius Nyerere nº 140, Prédio Azul, perto da Embaixada"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-blue-600 focus:bg-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Instruções de Entrega (Opcional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Ex: Entregar na recepção; ligar quando o estafeta estiver a chegar..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-blue-600 focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Step 3: Delivery Method */}
          <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-200">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">
                3
              </span>
              <span>Método de Envio</span>
            </h3>

            <div className="space-y-3">
              <label
                className={`flex items-start justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                  deliveryMethod === 'express_maputo'
                    ? 'bg-blue-50 border-blue-500'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="delivery"
                    value="express_maputo"
                    checked={deliveryMethod === 'express_maputo'}
                    onChange={() => setDeliveryMethod('express_maputo')}
                    className="accent-blue-600 mt-1"
                  />
                  <div>
                    <span className="font-bold text-slate-900 text-xs block">
                      Entrega Expressa Maputo & Matola (Mesmo Dia / 24h)
                    </span>
                    <span className="text-[11px] text-slate-600">
                      Estafeta dedicado com entregas rápidas na morada indicada.
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-blue-700">
                  {cartSubtotal >= 50000 ? 'Grátis' : '350 MT'}
                </span>
              </label>

              <label
                className={`flex items-start justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                  deliveryMethod === 'standard_mozambique'
                    ? 'bg-blue-50 border-blue-500'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="delivery"
                    value="standard_mozambique"
                    checked={deliveryMethod === 'standard_mozambique'}
                    onChange={() => setDeliveryMethod('standard_mozambique')}
                    className="accent-blue-600 mt-1"
                  />
                  <div>
                    <span className="font-bold text-slate-900 text-xs block">
                      Transportadora Nacional (Para Todas as Províncias)
                    </span>
                    <span className="text-[11px] text-slate-600">
                      Envio seguro terrestre/aéreo com código de rastreamento SMS.
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-blue-700">
                  {formatMZN(provinceData.standardFee)}
                </span>
              </label>

              <label
                className={`flex items-start justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                  deliveryMethod === 'levantamento_loja'
                    ? 'bg-blue-50 border-blue-500'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="delivery"
                    value="levantamento_loja"
                    checked={deliveryMethod === 'levantamento_loja'}
                    onChange={() => setDeliveryMethod('levantamento_loja')}
                    className="accent-blue-600 mt-1"
                  />
                  <div>
                    <span className="font-bold text-slate-900 text-xs block">
                      Levantamento Gratuito na Loja Maputo (Polana)
                    </span>
                    <span className="text-[11px] text-slate-600">
                      Pronto para levantamento em 2 horas na Av. 24 de Julho nº 1420.
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-700">Grátis</span>
              </label>
            </div>
          </div>

          {/* Step 4: Payment Methods Configurator for Mozambique */}
          <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2 pb-3 border-b border-slate-200">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">
                4
              </span>
              <span>Método de Pagamento em Moçambique</span>
            </h3>

            <div className="space-y-3">
              {PAYMENT_METHODS_DATA.map((method) => {
                const isSelected = paymentMethod === method.id;
                return (
                  <div
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id as PaymentMethod)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-blue-50/70 border-blue-500 shadow-sm'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={isSelected}
                          onChange={() => setPaymentMethod(method.id as PaymentMethod)}
                          className="accent-blue-600"
                        />
                        <span className="font-bold text-slate-900 text-xs">
                          {method.name}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                        {method.badge}
                      </span>
                    </div>

                    {/* Step-by-step instructions if selected */}
                    {isSelected && (
                      <div className="mt-3 pt-3 border-t border-blue-200/70 text-xs text-slate-700 space-y-1.5 animate-in fade-in">
                        <div className="text-[11px] font-semibold text-blue-700 mb-1">
                          Como proceder:
                        </div>
                        {method.steps.map((st, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="text-slate-500 text-[10px] font-bold mt-0.5">
                              {i + 1}.
                            </span>
                            <span className="text-slate-700 text-[11px]">{st}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl bg-slate-50 border border-slate-200 shadow-sm p-6 space-y-5 sticky top-24">
            <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-200">
              Resumo dos Artigos
            </h3>

            {/* Items snippet */}
            <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
              {cart.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3 text-xs">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-12 h-12 rounded-xl object-cover bg-white border border-slate-200 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-900 truncate">
                      {item.product.name}
                    </h4>
                    <div className="text-slate-500 text-[11px]">
                      {item.quantity}x {formatMZN(item.product.price)}
                    </div>
                  </div>
                  <span className="font-bold text-slate-900">
                    {formatMZN(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="pt-3 border-t border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between text-slate-700">
                <span>Subtotal:</span>
                <span className="font-bold text-slate-900">{formatMZN(cartSubtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-rose-600 font-medium">
                  <span>Desconto ({appliedCoupon?.code}):</span>
                  <span>-{formatMZN(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-700">
                <span>Envio para {province}:</span>
                <span className="font-bold text-emerald-700">
                  {shippingFee === 0 ? 'Grátis' : formatMZN(shippingFee)}
                </span>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
                <span className="text-sm font-black text-slate-900">Total Final:</span>
                <span className="text-2xl font-black text-slate-900 text-right">
                  {formatMZN(grandTotal)}
                </span>
              </div>
            </div>

            {/* Submit Order Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98]"
            >
              {isSubmitting ? (
                <span>A processar encomenda...</span>
              ) : (
                <>
                  <span>Confirmar & Submeter Encomenda</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="p-3 rounded-2xl bg-white border border-slate-200 text-[11px] text-slate-600 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-800 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Garantia de Satisfação e Originalidade</span>
              </div>
              <p>
                Após a submissão, receberá o código da encomenda e o botão para enviar os detalhes directos para o nosso WhatsApp para validação imediata.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
