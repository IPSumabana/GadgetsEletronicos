import React, { useState, useMemo } from 'react';
import {
  SlidersHorizontal,
  LayoutGrid,
  List,
  Search,
  X,
  Filter,
  Check,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/common/ProductCard';
import { CATEGORIES } from '../data/mockData';
import { formatMZN } from '../utils/formatters';
import { ProductCategory } from '../types';

export const ShopPage: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
  } = useStore();

  const [viewMode, setViewMode] = useState<'grid' | 'horizontal'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter States
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(300000);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [onlyDeals, setOnlyDeals] = useState(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<
    'recent' | 'price-asc' | 'price-desc' | 'rating' | 'popular'
  >('popular');

  // Extract all unique brands
  const allBrands = useMemo(() => {
    const brandsSet = new Set<string>();
    products.forEach((p) => brandsSet.add(p.brand));
    return Array.from(brandsSet).sort();
  }, [products]);

  // Handle Brand Toggle
  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedBrands([]);
    setMaxPrice(300000);
    setOnlyInStock(false);
    setOnlyDeals(false);
    setMinRating(0);
    setSearchQuery('');
    setSortBy('popular');
  };

  // Filter and Sort Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category
        if (selectedCategory !== 'all' && product.category !== selectedCategory) {
          return false;
        }
        // Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = product.name.toLowerCase().includes(q);
          const matchBrand = product.brand.toLowerCase().includes(q);
          const matchCat = product.categoryName.toLowerCase().includes(q);
          const matchSku = product.sku.toLowerCase().includes(q);
          if (!matchName && !matchBrand && !matchCat && !matchSku) return false;
        }
        // Brand
        if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
          return false;
        }
        // Price
        if (product.price > maxPrice) {
          return false;
        }
        // Stock
        if (onlyInStock && product.stock <= 0) {
          return false;
        }
        // Deals
        if (onlyDeals && !product.discountPercentage && !product.isFlashDeal) {
          return false;
        }
        // Rating
        if (minRating > 0 && product.rating < minRating) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'popular') return b.reviewCount - a.reviewCount;
        return 0; // recent/default
      });
  }, [
    products,
    selectedCategory,
    searchQuery,
    selectedBrands,
    maxPrice,
    onlyInStock,
    onlyDeals,
    minRating,
    sortBy,
  ]);

  const activeFiltersCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    selectedBrands.length +
    (onlyInStock ? 1 : 0) +
    (onlyDeals ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (maxPrice < 300000 ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header & Breadcrumb */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
          <span>Início</span>
          <span>/</span>
          <span className="text-white font-medium">Catálogo de Produtos</span>
          {selectedCategory !== 'all' && (
            <>
              <span>/</span>
              <span className="text-blue-400 font-semibold capitalize">
                {CATEGORIES.find((c) => c.id === selectedCategory)?.name || selectedCategory}
              </span>
            </>
          )}
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Loja de Tecnologia & Gadgets
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {filteredProducts.length} equipamentos encontrados em Meticais (MZN).
            </p>
          </div>

          {/* Controls: Search, View Mode, Mobile Filter Trigger */}
          <div className="flex items-center gap-3">
            {/* View Mode */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Grelha"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('horizontal')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === 'horizontal'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Lista"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200 outline-none cursor-pointer"
            >
              <option value="popular">Mais Populares</option>
              <option value="recent">Mais Recentes</option>
              <option value="price-asc">Preço: Mais Baixo</option>
              <option value="price-desc">Preço: Mais Alto</option>
              <option value="rating">Melhor Avaliação</option>
            </select>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5"
            >
              <Filter className="w-4 h-4 text-blue-400" />
              <span>Filtros</span>
              {activeFiltersCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout: Sidebar Filters + Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters Desktop */}
        <aside className="hidden lg:block lg:col-span-1 space-y-6 bg-slate-900/40 border border-slate-800/80 rounded-3xl p-6 h-fit sticky top-24">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-blue-400" />
              <span>Filtros Avançados</span>
            </h3>
            {activeFiltersCount > 0 && (
              <button
                onClick={handleResetFilters}
                className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Limpar</span>
              </button>
            )}
          </div>

          {/* Categorias */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Categorias
            </h4>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span>Todas as Categorias</span>
                <span className="text-[10px] opacity-75">{products.length}</span>
              </button>

              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-medium transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-blue-600 text-white font-bold'
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span className="truncate text-left">{cat.name}</span>
                  <span className="text-[10px] opacity-75">{cat.productCount}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Intervalo de Preços em MZN */}
          <div className="pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Preço Máximo
              </h4>
              <span className="text-xs font-bold text-blue-400">
                {formatMZN(maxPrice)}
              </span>
            </div>
            <input
              type="range"
              min="5000"
              max="300000"
              step="5000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>5.000 MT</span>
              <span>300.000 MT</span>
            </div>
          </div>

          {/* Marcas */}
          <div className="pt-4 border-t border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Marcas
            </h4>
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {allBrands.map((brand) => (
                <label
                  key={brand}
                  className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-800/60 cursor-pointer text-xs text-slate-300"
                >
                  <span className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                      className="accent-blue-600 rounded"
                    />
                    <span>{brand}</span>
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {products.filter((p) => p.brand === brand).length}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Toggles (Apenas Stock / Promoções) */}
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <label className="flex items-center justify-between p-2 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 cursor-pointer">
              <span>Apenas em Stock</span>
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="accent-blue-600 rounded"
              />
            </label>

            <label className="flex items-center justify-between p-2 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 cursor-pointer">
              <span>Em Promoção</span>
              <input
                type="checkbox"
                checked={onlyDeals}
                onChange={(e) => setOnlyDeals(e.target.checked)}
                className="accent-red-600 rounded"
              />
            </label>
          </div>
        </aside>

        {/* Product Grid Area */}
        <div className="lg:col-span-3">
          {/* Active Filter Pills */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 mb-4 p-3 rounded-2xl bg-slate-900/50 border border-slate-800">
              <span className="text-xs text-slate-400 font-semibold">Filtros:</span>
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 text-xs">
                  <span>Cat: {selectedCategory}</span>
                  <button onClick={() => setSelectedCategory('all')}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedBrands.map((brand) => (
                <span
                  key={brand}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-600/20 text-purple-400 border border-purple-500/30 text-xs"
                >
                  <span>{brand}</span>
                  <button onClick={() => toggleBrand(brand)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {onlyInStock && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 text-xs">
                  <span>Em Stock</span>
                  <button onClick={() => setOnlyInStock(false)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {onlyDeals && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-600/20 text-red-400 border border-red-500/30 text-xs">
                  <span>Promoções</span>
                  <button onClick={() => setOnlyDeals(false)}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              <button
                onClick={handleResetFilters}
                className="text-xs text-slate-400 hover:text-white underline ml-auto"
              >
                Limpar Todos
              </button>
            </div>
          )}

          {filteredProducts.length > 0 ? (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'
                  : 'space-y-4'
              }
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  variant={viewMode}
                />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center rounded-3xl bg-slate-900/50 border border-slate-800">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">
                Nenhum produto corresponde aos filtros
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto mb-6">
                Tente ajustar o preço máximo, remover marcas selecionadas ou pesquisar por outro termo.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30"
              >
                Reiniciar Todos os Filtros
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Modal Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-xs bg-slate-900 border-l border-slate-800 h-full p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <h3 className="font-bold text-white text-base">Filtros da Loja</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-2 rounded-xl bg-slate-800 text-slate-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Categorias */}
            <div>
              <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">
                Categorias
              </h4>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left p-2 rounded-lg text-xs ${
                    selectedCategory === 'all'
                      ? 'bg-blue-600 text-white font-bold'
                      : 'text-slate-300'
                  }`}
                >
                  Todas as Categorias
                </button>
                {CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.id)}
                    className={`w-full text-left p-2 rounded-lg text-xs ${
                      selectedCategory === c.id
                        ? 'bg-blue-600 text-white font-bold'
                        : 'text-slate-300'
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-bold text-xs"
            >
              Aplicar ({filteredProducts.length} Produtos)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
