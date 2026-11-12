import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  ShoppingCart,
  Heart,
  SlidersHorizontal,
  User as UserIcon,
  Menu,
  X,
  Phone,
  Flame,
  Sparkles,
  ShieldAlert,
  ChevronDown,
  Layers,
  ArrowRight,
  MapPin,
  ExternalLink,
  Laptop,
  Check,
} from 'lucide-react';
import { useStore, NavigationPage } from '../../context/StoreContext';
import { formatMZN, WHATSAPP_DISPLAY, generateWhatsAppOrderLink } from '../../utils/formatters';
import { CATEGORIES } from '../../data/mockData';

export const Navbar: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    cartCount,
    cartSubtotal,
    wishlist,
    compareList,
    currentUser,
    login,
    logout,
    searchQuery,
    setSearchQuery,
    products,
    navigateToProduct,
    setSelectedCategory,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdownOpen, setCategoriesDropdownOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close search suggestions on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchFocused(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCategoriesDropdownOpen(false);
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtered products for search autocomplete
  const searchResults = searchQuery.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchFocused(false);
      setCurrentPage('shop');
    }
  };

  const navLinks: { name: string; page: NavigationPage; badge?: string; hot?: boolean }[] = [
    { name: 'Início', page: 'home' },
    { name: 'Loja Completa', page: 'shop' },
    { name: 'Categorias', page: 'categories' },
    { name: 'Promoções', page: 'flash-deals', badge: 'Flash', hot: true },
    { name: 'Novidades', page: 'new-arrivals', badge: '2026' },
    { name: 'Óculos Inteligentes', page: 'shop' },
    { name: 'Blog Tech', page: 'blog' },
    { name: 'Rastrear Encomenda', page: 'order-tracking' },
    { name: 'Contactos', page: 'contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#080c14]/95 backdrop-blur-md border-b border-slate-800/80">
      {/* 1. Top Announcement Bar */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border-b border-blue-900/40 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-medium">
              🇲🇿 Entregas Rápidas em Maputo, Matola e em todas as províncias de Moçambique!
            </span>
            <span className="hidden md:inline text-blue-400 font-semibold">
              | Portes grátis para compras acima de 5.000 MT
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <a
              href="https://wa.me/258849900110"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 flex items-center gap-1.5 font-medium transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              WhatsApp: <strong className="text-white">{WHATSAPP_DISPLAY}</strong>
            </a>
            <span className="hidden sm:inline text-slate-600">|</span>
            <div className="hidden sm:flex items-center gap-1 text-slate-300">
              <span className="text-[11px] font-bold text-amber-400 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-800/50">
                MZN
              </span>
              <span>Metical Moçambicano</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-2.5 cursor-pointer group flex-shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:shadow-blue-500/50 transition-all duration-300 border border-blue-400/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-white group-hover:text-blue-400 transition-colors">
                  GADGETS<span className="text-blue-500">ZONE</span>
                </span>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-700/50 px-1.5 py-0.2 rounded uppercase">
                  MZ
                </span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-wider uppercase font-semibold">
              
              </p>
            </div>
          </div>

          {/* Search Bar with Autocomplete Dropdown */}
          <div ref={searchRef} className="hidden md:flex-1 max-w-xl mx-4 relative">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder="Pesquisar MacBooks, PC Gaming, PS5, Óculos Meta, SSDs..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchFocused(true);
                }}
                onFocus={() => setSearchFocused(true)}
                className="w-full pl-11 pr-24 py-2.5 rounded-2xl bg-slate-900/90 border border-slate-700/80 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-sm text-slate-100 placeholder-slate-400 outline-none transition-all shadow-inner"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
              >
                Buscar
              </button>
            </form>

            {/* Live Autocomplete Results */}
            {searchFocused && searchQuery.trim().length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-2 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in">
                {searchResults.length > 0 ? (
                  <div>
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1 mb-1">
                      Produtos Encontrados ({searchResults.length})
                    </div>
                    <div className="space-y-1">
                      {searchResults.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => {
                            navigateToProduct(product.id);
                            setSearchFocused(false);
                          }}
                          className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800 cursor-pointer transition-colors"
                        >
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-10 h-10 rounded-lg object-cover bg-slate-950 flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-semibold text-white truncate">
                              {product.name}
                            </h4>
                            <div className="flex items-center gap-2 text-[11px] text-slate-400">
                              <span className="text-blue-400 font-bold">
                                {formatMZN(product.price)}
                              </span>
                              <span>•</span>
                              <span>{product.categoryName}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => {
                        setSearchFocused(false);
                        setCurrentPage('shop');
                      }}
                      className="w-full mt-2 py-1.5 text-center text-xs text-blue-400 hover:text-blue-300 font-semibold border-t border-slate-800 pt-2 flex items-center justify-center gap-1"
                    >
                      <span>Ver todos os resultados para "{searchQuery}"</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="p-4 text-center text-xs text-slate-400">
                    Nenhum equipamento encontrado para "{searchQuery}".
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Icons (Compare, Wishlist, Cart, User) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Compare */}
            <button
              onClick={() => setCurrentPage('compare')}
              className="relative p-2.5 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
              title="Comparar Produtos"
            >
              <SlidersHorizontal className="w-4 h-4" />
              {compareList.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-blue-600 text-[10px] font-bold text-white flex items-center justify-center shadow-md">
                  {compareList.length}
                </span>
              )}
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setCurrentPage('account')}
              className="relative p-2.5 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-rose-400 transition-colors"
              title="Favoritos"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-[10px] font-bold text-white flex items-center justify-center shadow-md">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button with Total */}
            <button
              onClick={() => setCurrentPage('cart')}
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-600/20 to-indigo-600/20 hover:from-blue-600/30 hover:to-indigo-600/30 border border-blue-500/30 text-white transition-all shadow-md group"
              title="Carrinho de Compras"
            >
              <div className="relative">
                <ShoppingCart className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 w-4 h-4 rounded-full bg-blue-500 text-[10px] font-black text-white flex items-center justify-center shadow-sm">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden lg:flex flex-col text-left leading-tight">
                <span className="text-[10px] text-slate-400 font-medium">Carrinho</span>
                <span className="text-xs font-bold text-white">
                  {formatMZN(cartSubtotal)}
                </span>
              </div>
            </button>

            {/* User Account / Role Switcher Menu */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-1.5 p-2 sm:px-3 sm:py-2 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-xs font-bold text-white">
                  {currentUser ? currentUser.name.charAt(0) : <UserIcon className="w-3.5 h-3.5" />}
                </div>
                <div className="hidden xl:flex flex-col text-left">
                  <span className="text-[11px] font-bold text-white leading-tight">
                    {currentUser ? currentUser.name.split(' ')[0] : 'Entrar'}
                  </span>
                  <span className="text-[9px] text-blue-400 uppercase font-semibold">
                    {currentUser?.role === 'admin' ? 'Admin' : 'Cliente'}
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:inline" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-3 z-50 animate-in fade-in">
                  {currentUser ? (
                    <div>
                      <div className="p-2 border-b border-slate-800 mb-2">
                        <div className="font-bold text-sm text-white">{currentUser.name}</div>
                        <div className="text-xs text-slate-400 truncate">{currentUser.email}</div>
                        <div className="mt-1 flex items-center gap-1.5">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              currentUser.role === 'admin'
                                ? 'bg-purple-950 text-purple-300 border border-purple-800'
                                : 'bg-blue-950 text-blue-300 border border-blue-800'
                            }`}
                          >
                            {currentUser.role === 'admin' ? '🛡️ Administrador' : '👤 Cliente Moçambique'}
                          </span>
                        </div>
                      </div>

                      {/* Fast demo role toggler to facilitate reviewing the app */}
                      <div className="p-2 bg-slate-950/60 rounded-xl mb-2 text-xs">
                        <div className="text-[10px] text-slate-400 font-semibold uppercase mb-1">
                          Alternar Perfil Demo:
                        </div>
                        <div className="grid grid-cols-2 gap-1">
                          <button
                            onClick={() => {
                              login('armando.guambe@gmail.com', 'cliente');
                              setUserDropdownOpen(false);
                            }}
                            className={`py-1 px-2 rounded-lg text-[11px] font-medium transition-colors ${
                              currentUser.role === 'cliente'
                                ? 'bg-blue-600 text-white font-bold'
                                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                            }`}
                          >
                            Cliente
                          </button>
                          <button
                            onClick={() => {
                              login('admin@gadgetszone.co.mz', 'admin');
                              setUserDropdownOpen(false);
                            }}
                            className={`py-1 px-2 rounded-lg text-[11px] font-medium transition-colors ${
                              currentUser.role === 'admin'
                                ? 'bg-purple-600 text-white font-bold'
                                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                            }`}
                          >
                            Admin
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1 text-xs">
                        <button
                          onClick={() => {
                            setCurrentPage('account');
                            setUserDropdownOpen(false);
                          }}
                          className="w-full text-left p-2 rounded-xl text-slate-200 hover:bg-slate-800 transition-colors"
                        >
                          Minha Conta & Encomendas
                        </button>
                        {currentUser.role === 'admin' && (
                          <button
                            onClick={() => {
                              setCurrentPage('admin');
                              setUserDropdownOpen(false);
                            }}
                            className="w-full text-left p-2 rounded-xl text-purple-400 hover:bg-purple-950/50 font-bold transition-colors"
                          >
                            ⚙️ Aceder ao Painel Admin
                          </button>
                        )}
                        <button
                          onClick={() => {
                            logout();
                            setUserDropdownOpen(false);
                          }}
                          className="w-full text-left p-2 rounded-xl text-rose-400 hover:bg-slate-800 transition-colors"
                        >
                          Terminar Sessão
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-2 space-y-2">
                      <p className="text-xs text-slate-300">
                        Inicie sessão para gerir as suas encomendas.
                      </p>
                      <button
                        onClick={() => {
                          setCurrentPage('auth');
                          setUserDropdownOpen(false);
                        }}
                        className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors"
                      >
                        Iniciar Sessão / Registar
                      </button>
                      <button
                        onClick={() => {
                          login('admin@gadgetszone.co.mz', 'admin');
                          setUserDropdownOpen(false);
                          setCurrentPage('admin');
                        }}
                        className="w-full py-1.5 px-3 rounded-xl bg-purple-950/60 hover:bg-purple-900 border border-purple-800/60 text-purple-300 text-xs font-semibold transition-colors"
                      >
                        Entrar Directo como Admin
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl border border-slate-800 bg-slate-900/60 text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search input */}
        <div className="md:hidden mt-3">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              placeholder="Pesquisar tecnologia em Moçambique..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-20 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-100 placeholder-slate-400 outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-blue-600 text-white text-xs font-semibold"
            >
              Buscar
            </button>
          </form>
        </div>
      </div>

      {/* 3. Sub-Navigation Category Links Bar */}
      <div className="hidden md:block bg-slate-950/90 border-t border-slate-800/60 text-xs">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-1 py-1">
            {/* All Categories Dropdown Button */}
            <div className="relative">
              <button
                onClick={() => setCategoriesDropdownOpen(!categoriesDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-600/15 hover:bg-blue-600/25 text-blue-400 font-bold border border-blue-500/30 transition-all mr-2"
              >
                <Layers className="w-4 h-4" />
                <span>Todas as Categorias</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {categoriesDropdownOpen && (
                <div className="absolute left-0 top-full mt-2 w-72 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in">
                  <div className="space-y-1 max-h-96 overflow-y-auto">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setSelectedCategory(cat.id);
                          setCurrentPage('shop');
                          setCategoriesDropdownOpen(false);
                        }}
                        className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition-colors text-left"
                      >
                        <span className="font-medium text-xs">{cat.name}</span>
                        <span className="text-[10px] text-slate-500 font-semibold bg-slate-800 px-1.5 py-0.5 rounded">
                          {cat.productCount}
                        </span>
                      </button>
                    ))}
                  </div>
                  <div className="border-t border-slate-800 pt-2 mt-2 px-2">
                    <button
                      onClick={() => {
                        setCurrentPage('categories');
                        setCategoriesDropdownOpen(false);
                      }}
                      className="text-xs text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1"
                    >
                      <span>Ver directório de categorias completo</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Direct navigation links */}
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.name}
                  onClick={() => {
                    if (link.name === 'Óculos Inteligentes') {
                      setSelectedCategory('smart-glasses');
                      setCurrentPage('shop');
                    } else {
                      setCurrentPage(link.page);
                    }
                  }}
                  className={`px-3 py-2 rounded-xl font-medium transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'text-white bg-slate-800 font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  {link.hot && <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
                  <span>{link.name}</span>
                  {link.badge && (
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                        link.hot
                          ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                          : 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                      }`}
                    >
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Admin shortcut button */}
          <button
            onClick={() => setCurrentPage('admin')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentPage === 'admin'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'bg-purple-950/40 hover:bg-purple-900/50 text-purple-300 border border-purple-800/40'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Painel Admin</span>
          </button>
        </div>
      </div>

      {/* 4. Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 py-4 space-y-3 animate-in slide-in-from-top-4">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => {
                  if (link.name === 'Óculos Inteligentes') {
                    setSelectedCategory('smart-glasses');
                    setCurrentPage('shop');
                  } else {
                    setCurrentPage(link.page);
                  }
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800 text-left text-sm font-medium text-slate-200"
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="text-[10px] font-bold bg-blue-600/30 text-blue-300 px-2 py-0.5 rounded-full">
                    {link.badge}
                  </span>
                )}
              </button>
            ))}

            <button
              onClick={() => {
                setCurrentPage('admin');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl bg-purple-950/50 text-purple-300 font-bold text-sm"
            >
              <span>🛡️ Painel de Administração</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="pt-3 border-t border-slate-800 space-y-2">
            <a
              href="https://wa.me/258823441439"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Falar no WhatsApp: {WHATSAPP_DISPLAY}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
