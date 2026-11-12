import React from 'react';
import {
  Home,
  ShoppingBag,
  Flame,
  ShoppingCart,
  User,
  Heart,
  Search,
} from 'lucide-react';
import { useStore, NavigationPage } from '../../context/StoreContext';
import { formatMZN } from '../../utils/formatters';

export const MobileBottomNav: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    cartCount,
    cartSubtotal,
    wishlist,
    currentUser,
  } = useStore();

  const navItems: {
    id: NavigationPage;
    label: string;
    icon: React.ElementType;
    badge?: number | string;
    isHot?: boolean;
  }[] = [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'shop', label: 'Loja', icon: ShoppingBag },
    {
      id: 'flash-deals',
      label: 'Promoções',
      icon: Flame,
      isHot: true,
      badge: 'HOT',
    },
    {
      id: 'cart',
      label: 'Carrinho',
      icon: ShoppingCart,
      badge: cartCount > 0 ? cartCount : undefined,
    },
    {
      id: currentUser ? 'account' : 'auth',
      label: currentUser ? 'Conta' : 'Entrar',
      icon: User,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#070b12]/95 backdrop-blur-xl border-t border-slate-800/90 shadow-[0_-8px_30px_rgba(0,0,0,0.6)] px-2 py-1.5 safe-area-pb">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive =
            currentPage === item.id ||
            (item.id === 'account' && currentPage === 'admin');
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              onClick={() => {
                setCurrentPage(item.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-200 min-w-[3.8rem] ${
                isActive
                  ? 'text-blue-400 font-bold'
                  : 'text-slate-400 hover:text-slate-200 font-medium'
              }`}
            >
              {/* Active Indicator Pip */}
              {isActive && (
                <span className="absolute -top-1 w-5 h-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 shadow-sm shadow-blue-500/50" />
              )}

              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110 text-blue-400' : ''
                  } ${item.isHot ? 'text-amber-400' : ''}`}
                />

                {/* Badge (cart count or hot pill) */}
                {item.badge !== undefined && (
                  <span
                    className={`absolute -top-1.5 -right-2.5 min-w-[1.1rem] h-[1.1rem] px-1 rounded-full text-[9px] font-black flex items-center justify-center shadow-md ${
                      item.isHot
                        ? 'bg-red-500 text-white'
                        : 'bg-blue-600 text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </div>

              <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-[4rem]">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
