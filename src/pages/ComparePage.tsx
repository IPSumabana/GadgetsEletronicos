import React from 'react';
import {
  SlidersHorizontal,
  X,
  ShoppingCart,
  Trash2,
  Check,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatMZN } from '../utils/formatters';

export const ComparePage: React.FC = () => {
  const {
    compareList,
    removeFromCompare,
    clearCompare,
    products,
    addToCart,
    setCurrentPage,
    navigateToProduct,
  } = useStore();

  const comparedProducts = products.filter((p) => compareList.includes(p.id));

  if (comparedProducts.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500">
          <SlidersHorizontal className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-white mb-2">
          Nenhum produto selecionado para comparação
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto mb-6">
          Clique no ícone de comparação nos cartões de produtos na loja para comparar especificações técnicas lado a lado.
        </p>
        <button
          onClick={() => setCurrentPage('shop')}
          className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all inline-flex items-center gap-2"
        >
          <span>Ir para a Loja</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  // Collect all unique specification keys across all compared products
  const allSpecKeys = Array.from(
    new Set(
      comparedProducts.flatMap((p) => Object.keys(p.specifications))
    )
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
            <SlidersHorizontal className="w-6 h-6 text-blue-400" />
            <span>Comparador Técnico de Produtos</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Comparação detalhada de até 4 equipamentos lado a lado.
          </p>
        </div>

        <button
          onClick={clearCompare}
          className="text-xs text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1 self-start sm:self-auto"
        >
          <Trash2 className="w-4 h-4" />
          <span>Limpar Comparação</span>
        </button>
      </div>

      {/* Comparison Matrix Table */}
      <div className="rounded-3xl bg-slate-900/60 border border-slate-800 overflow-x-auto shadow-2xl">
        <table className="w-full text-left text-xs text-slate-300 border-collapse min-w-[700px]">
          {/* Header Row: Images & Main Info */}
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/60">
              <th className="p-4 w-48 text-slate-400 uppercase font-bold text-[11px] align-top">
                Produto
              </th>
              {comparedProducts.map((prod) => (
                <th key={prod.id} className="p-4 min-w-[220px] align-top">
                  <div className="relative">
                    <button
                      onClick={() => removeFromCompare(prod.id)}
                      className="absolute -top-1 -right-1 p-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
                      title="Remover"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>

                    <div
                      onClick={() => navigateToProduct(prod.id)}
                      className="cursor-pointer group"
                    >
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        className="w-full h-36 rounded-2xl object-cover bg-slate-950 border border-slate-800 mb-2 group-hover:scale-[1.02] transition-transform"
                      />
                      <span className="text-[10px] font-bold text-blue-400 uppercase">
                        {prod.brand}
                      </span>
                      <h4 className="text-xs font-bold text-white line-clamp-2 group-hover:text-blue-300 transition-colors mt-0.5">
                        {prod.name}
                      </h4>
                    </div>

                    <div className="mt-3">
                      <div className="text-base font-black text-white">
                        {formatMZN(prod.price)}
                      </div>
                      {prod.oldPrice && (
                        <div className="text-[10px] text-slate-500 line-through">
                          {formatMZN(prod.oldPrice)}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => addToCart(prod)}
                      className="w-full mt-3 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/30"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                      <span>Adicionar</span>
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800/60">
            {/* General Specs */}
            <tr className="bg-slate-950/30">
              <td className="p-3 font-bold text-slate-400">Categoria</td>
              {comparedProducts.map((p) => (
                <td key={p.id} className="p-3 text-slate-200">
                  {p.categoryName}
                </td>
              ))}
            </tr>

            <tr>
              <td className="p-3 font-bold text-slate-400">Disponibilidade Stock</td>
              {comparedProducts.map((p) => (
                <td key={p.id} className="p-3">
                  <span
                    className={
                      p.stock > 0
                        ? 'text-emerald-400 font-bold'
                        : 'text-rose-400 font-bold'
                    }
                  >
                    {p.stock > 0 ? `✓ Em Stock (${p.stock} un.)` : '✗ Esgotado'}
                  </span>
                </td>
              ))}
            </tr>

            <tr className="bg-slate-950/30">
              <td className="p-3 font-bold text-slate-400">Garantia Oficial</td>
              {comparedProducts.map((p) => (
                <td key={p.id} className="p-3 text-slate-200">
                  <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" /> {p.warrantyMonths} Meses em Moçambique
                  </span>
                </td>
              ))}
            </tr>

            <tr>
              <td className="p-3 font-bold text-slate-400">Classificação dos Clientes</td>
              {comparedProducts.map((p) => (
                <td key={p.id} className="p-3 text-amber-400 font-bold">
                  ★ {p.rating.toFixed(1)} ({p.reviewCount} avaliações)
                </td>
              ))}
            </tr>

            {/* Technical Specification Keys */}
            {allSpecKeys.map((key, idx) => (
              <tr
                key={key}
                className={idx % 2 === 0 ? 'bg-slate-950/40' : 'bg-transparent'}
              >
                <td className="p-3 font-bold text-slate-400">{key}</td>
                {comparedProducts.map((p) => (
                  <td key={p.id} className="p-3 text-slate-200">
                    {p.specifications[key] || '-'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
