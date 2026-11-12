import React, { useState } from 'react';
import {
  User as UserIcon,
  Package,
  Heart,
  MapPin,
  LogOut,
  ShieldAlert,
  ArrowRight,
  ExternalLink,
  Truck,
  CheckCircle2,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatMZN, formatDate } from '../utils/formatters';
import { ProductCard } from '../components/common/ProductCard';

export const AccountPage: React.FC = () => {
  const {
    currentUser,
    logout,
    orders,
    wishlist,
    products,
    setCurrentPage,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'profile'>('orders');

  if (!currentUser) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">
          Inicie sessão para ver a sua conta.
        </h2>
        <button
          onClick={() => setCurrentPage('auth')}
          className="px-6 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs"
        >
          Iniciar Sessão / Registar
        </button>
      </div>
    );
  }

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* User Header Profile Card */}
      <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-black text-2xl text-white shadow-xl shadow-blue-600/30">
            {currentUser.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white">
                {currentUser.name}
              </h1>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                  currentUser.role === 'admin'
                    ? 'bg-purple-950 text-purple-300 border border-purple-800'
                    : 'bg-blue-950 text-blue-300 border border-blue-800'
                }`}
              >
                {currentUser.role === 'admin' ? 'Administrador' : 'Cliente Moçambique'}
              </span>
            </div>
            <div className="text-xs text-slate-400 mt-1">
              {currentUser.email} • {currentUser.phone}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {currentUser.role === 'admin' && (
            <button
              onClick={() => setCurrentPage('admin')}
              className="px-4 py-2.5 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-800 text-purple-300 font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Painel Admin</span>
            </button>
          )}

          <button
            onClick={() => {
              logout();
              setCurrentPage('home');
            }}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-rose-400 font-semibold text-xs flex items-center gap-1.5 transition-colors border border-slate-700"
          >
            <LogOut className="w-4 h-4" />
            <span>Sair</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
            activeTab === 'orders'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Histórico de Encomendas ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('wishlist')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
            activeTab === 'wishlist'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Favoritos ({wishlist.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
            activeTab === 'profile'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Morada & Perfil</span>
        </button>
      </div>

      {/* Tab 1: Orders History */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div
                key={order.id}
                className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 space-y-4 text-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                  <div>
                    <span className="font-mono font-bold text-base text-white">
                      #{order.id}
                    </span>
                    <span className="text-slate-400 ml-3">
                      {formatDate(order.createdAt)}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-950/60 text-amber-300 border border-amber-800/60 uppercase">
                      {order.status.replace('_', ' ')}
                    </span>
                    <button
                      onClick={() => setCurrentPage('order-tracking')}
                      className="px-3 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-300 font-bold text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>Rastrear</span>
                    </button>
                  </div>
                </div>

                {/* Items in order */}
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center justify-between text-slate-300"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-10 h-10 rounded-xl object-cover bg-slate-950"
                        />
                        <div>
                          <div className="font-semibold text-white">
                            {item.product.name}
                          </div>
                          <div className="text-slate-500 text-[11px]">
                            {item.quantity}x {formatMZN(item.product.price)}
                          </div>
                        </div>
                      </div>
                      <span className="font-bold text-white">
                        {formatMZN(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-slate-400">
                  <span>
                    Entrega em: <strong className="text-slate-200">{order.city}, {order.province}</strong>
                  </span>
                  <div className="text-sm font-black text-white">
                    Total: <span className="text-blue-400">{formatMZN(order.total)}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center rounded-3xl bg-slate-900/40 border border-slate-800 text-slate-400">
              Ainda não realizou nenhuma encomenda.
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Wishlist */}
      {activeTab === 'wishlist' && (
        <div>
          {wishlistProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {wishlistProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center rounded-3xl bg-slate-900/40 border border-slate-800 text-slate-400">
              A sua lista de favoritos está vazia.
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Profile & Address */}
      {activeTab === 'profile' && (
        <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 space-y-4 max-w-xl text-xs">
          <h3 className="text-base font-bold text-white mb-2">
            Morada de Entrega Principal em Moçambique
          </h3>
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
            <div>
              <span className="text-slate-500 block">Nome:</span>
              <span className="font-bold text-white text-sm">{currentUser.name}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Província:</span>
              <span className="font-medium text-slate-200">
                {currentUser.address?.province || 'Maputo Cidade'}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Bairro / Cidade:</span>
              <span className="font-medium text-slate-200">
                {currentUser.address?.city || 'Polana'}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Rua & Ponto de Referência:</span>
              <span className="font-medium text-slate-200">
                {currentUser.address?.street || 'Av. Julius Nyerere nº 1840'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
