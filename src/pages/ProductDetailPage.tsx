import React, { useState } from 'react';
import {
  Heart,
  ShoppingCart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  SlidersHorizontal,
  ExternalLink,
  ChevronRight,
  MessageCircle,
  ArrowRight,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';
import { formatMZN, generateWhatsAppOrderLink, WHATSAPP_DISPLAY } from '../utils/formatters';
import { MOZAMBIQUE_PROVINCES, INITIAL_REVIEWS } from '../data/mockData';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProductId,
    products,
    addToCart,
    setCurrentPage,
    toggleWishlist,
    isInWishlist,
    addToCompare,
    isInCompare,
    showToast,
  } = useStore();

  const product = products.find((p) => p.id === selectedProductId) || products[0];

  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedProvinceName, setSelectedProvinceName] = useState('Maputo Cidade');
  const [activeTab, setActiveTab] = useState<'specs' | 'description' | 'reviews'>('specs');

  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);

  const isFavorite = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);
  const selectedProvinceInfo =
    MOZAMBIQUE_PROVINCES.find((p) => p.name === selectedProvinceName) ||
    MOZAMBIQUE_PROVINCES[0];

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setCurrentPage('checkout');
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) {
      showToast('Por favor preencha o seu nome e comentário.', 'error');
      return;
    }
    const newRev = {
      id: `rev-${Date.now()}`,
      productId: product.id,
      userName: newReviewAuthor,
      rating: newReviewRating,
      title: 'Avaliação de Cliente Moçambique',
      comment: newReviewComment,
      date: 'Hoje',
      verified: true,
      helpfulCount: 1,
    };
    setReviews([newRev, ...reviews]);
    setNewReviewAuthor('');
    setNewReviewComment('');
    setShowReviewForm(false);
    showToast('Obrigado pela sua avaliação! Publicada com sucesso.', 'success');
  };

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <button
          onClick={() => setCurrentPage('home')}
          className="hover:text-slate-900 transition-colors"
        >
          Início
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button
          onClick={() => setCurrentPage('shop')}
          className="hover:text-slate-900 transition-colors"
        >
          Loja
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-blue-600 font-semibold">{product.categoryName}</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-700 truncate max-w-xs">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 space-y-4">
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-lg">
            <img
              src={product.images[selectedImgIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
            {product.discountPercentage && (
              <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-black px-3 py-1 rounded-full shadow-md">
                -{product.discountPercentage}% DE DESCONTO
              </span>
            )}
            {product.isNew && (
              <span className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                Edição 2026
              </span>
            )}
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImgIndex(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 ${
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

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-700">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>
                <strong>Garantia Oficial de {product.warrantyMonths} Meses</strong> contra qualquer defeito.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-blue-600" />
              <span>Equipamento 100% selado na caixa original de fábrica.</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-purple-600" />
              <span>7 dias para devolução ou troca caso não corresponda.</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                {product.brand}
              </span>
              <span className="text-xs text-slate-500">SKU: {product.sku}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight mb-3">
              {product.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5 text-amber-500 font-bold">
                <div className="flex text-amber-500">
                  {'★'.repeat(Math.round(product.rating))}
                </div>
                <span>{product.rating.toFixed(1)}</span>
                <span className="text-slate-500 font-normal">
                  ({product.reviewCount} avaliações de clientes em Moçambique)
                </span>
              </div>
              <span className="text-slate-300">|</span>
              <span
                className={`font-semibold ${
                  product.stock > 0 ? 'text-emerald-700' : 'text-rose-600'
                }`}
              >
                {product.stock > 0
                  ? `✓ Em Stock (${product.stock} unidades disponíveis)`
                  : 'Esgotado de momento'}
              </span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200">
            <div className="flex items-baseline gap-4 mb-2">
              <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {formatMZN(product.price)}
              </span>
              {product.oldPrice && (
                <span className="text-base sm:text-lg text-slate-400 line-through">
                  {formatMZN(product.oldPrice)}
                </span>
              )}
              {product.oldPrice && (
                <span className="text-xs font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                  Poupe {formatMZN(product.oldPrice - product.price)}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-600">
              Preço final com impostos incluídos. Aceita M-Pesa, e-Mola, SIMO e Transferência BIM/BCI.
            </p>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            {product.shortDescription}
          </p>

          {product.features && product.features.length > 0 && (
            <div className="space-y-1.5 text-xs text-slate-700">
              {product.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          )}

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-blue-600" />
                <span>Calcular Entrega em Maputo e Matola:</span>
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={selectedProvinceName}
                onChange={(e) => setSelectedProvinceName(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 outline-none"
              >
                {MOZAMBIQUE_PROVINCES.map((p) => (
                  <option key={p.name} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>

              <div className="flex items-center justify-between sm:justify-start gap-4 px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-500 text-[10px] block">Prazo Estimado:</span>
                  <span className="text-slate-900 font-bold">
                    {selectedProvinceInfo.estimatedDays}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">Portes:</span>
                  <span className="text-blue-600 font-bold">
                    {formatMZN(selectedProvinceInfo.standardFee)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="flex items-center justify-between border border-slate-300 rounded-2xl bg-slate-50 px-3 py-2 sm:w-36">
                <span className="text-xs text-slate-500">Qtd:</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-800 hover:bg-slate-100 flex items-center justify-center font-bold"
                  >
                    -
                  </button>
                  <span className="text-sm font-bold text-slate-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="w-7 h-7 rounded-lg bg-white border border-slate-200 text-slate-800 hover:bg-slate-100 flex items-center justify-center font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                disabled={product.stock <= 0}
                onClick={handleAddToCart}
                className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98]"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Adicionar ao Carrinho</span>
              </button>

              <button
                disabled={product.stock <= 0}
                onClick={handleBuyNow}
                className="py-3.5 px-6 rounded-2xl bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-sm transition-all"
              >
                Comprar Já
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                href={generateWhatsAppOrderLink(product.name, product.price, product.sku)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Encomendar ou Negociar pelo WhatsApp ({WHATSAPP_DISPLAY})</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`p-3 rounded-2xl border transition-all flex items-center justify-center gap-1.5 flex-1 sm:flex-initial ${
                    isFavorite
                      ? 'bg-rose-50 border-rose-200 text-rose-600'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-rose-600'
                  }`}
                  title="Favoritos"
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
                  <span className="text-xs sm:hidden">Favoritos</span>
                </button>

                <button
                  onClick={() => addToCompare(product.id)}
                  className={`p-3 rounded-2xl border transition-all flex items-center justify-center gap-1.5 flex-1 sm:flex-initial ${
                    isCompared
                      ? 'bg-blue-50 border-blue-200 text-blue-600'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-blue-600'
                  }`}
                  title="Comparar"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span className="text-xs sm:hidden">Comparar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-2 border-b border-slate-200 pb-4 mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('specs')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'specs'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Ficha Técnica Detalhada
          </button>

          <button
            onClick={() => setActiveTab('description')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'description'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Descrição Completa
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'reviews'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <span>Avaliações de Clientes</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === 'reviews' ? 'bg-blue-700 text-white' : 'bg-slate-200 text-slate-700'}`}>
              {reviews.length}
            </span>
          </button>
        </div>

        {activeTab === 'specs' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <tbody>
                {Object.entries(product.specifications).map(([key, val], idx) => (
                  <tr
                    key={key}
                    className={idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}
                  >
                    <td className="py-3 px-4 font-semibold text-slate-500 w-1/3 border-b border-slate-100">
                      {key}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-900 border-b border-slate-100">
                      {val}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'description' && (
          <div className="prose max-w-none text-xs sm:text-sm text-slate-700 space-y-4 leading-relaxed">
            <p>{product.fullDescription}</p>
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-900">
              <h4 className="font-bold mb-1">Garantia e Suporte em Moçambique:</h4>
              <p>
                Todos os equipamentos comercializados pela GADGETSZONE possuem garantia de {product.warrantyMonths} meses com canal prioritário em Maputo. Suporte para ativação, migração de dados e configurações de software incluído gratuitamente.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">
                  Avaliações de Utilizadores
                </h4>
                <p className="text-xs text-slate-600">
                  Comentários de compradores com encomendas entregues em Moçambique.
                </p>
              </div>
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs self-start sm:self-auto transition-colors"
              >
                {showReviewForm ? 'Fechar Formulário' : 'Escrever Avaliação'}
              </button>
            </div>

            {showReviewForm && (
              <form
                onSubmit={handleAddReview}
                className="p-5 rounded-2xl bg-slate-50 border border-blue-200 space-y-4"
              >
                <h4 className="font-bold text-slate-900 text-xs">
                  Deixe a sua experiência sobre este produto:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-600 block mb-1">
                      O seu Nome:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Celso Manjate"
                      value={newReviewAuthor}
                      onChange={(e) => setNewReviewAuthor(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-600 block mb-1">
                      Classificação:
                    </label>
                    <select
                      value={newReviewRating}
                      onChange={(e) => setNewReviewRating(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 outline-none"
                    >
                      <option value="5">★★★★★ 5 Estrelas (Excelente)</option>
                      <option value="4">★★★★☆ 4 Estrelas (Muito Bom)</option>
                      <option value="3">★★★☆☆ 3 Estrelas (Bom)</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-[11px] text-slate-600 block mb-1">
                    Comentário:
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Conte sobre a velocidade, qualidade e se a entrega em Moçambique correu bem..."
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm"
                >
                  Submeter Avaliação
                </button>
              </form>
            )}

            <div className="space-y-4">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{rev.userName}</span>
                      {rev.verified && (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Check className="w-3 h-3" /> Compra Verificada Moçambique
                        </span>
                      )}
                    </div>
                    <span className="text-slate-500 text-[11px]">{rev.date}</span>
                  </div>
                  <div className="text-amber-500 font-bold">
                    {'★'.repeat(rev.rating)}
                  </div>
                  <p className="text-slate-700 leading-relaxed">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {relatedProducts.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-slate-900">
              Produtos Relacionados na Categoria
            </h3>
            <button
              onClick={() => setCurrentPage('shop')}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>Ver Catálogo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
