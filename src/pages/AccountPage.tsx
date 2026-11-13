import React, { useState } from 'react';
import {
  Package,
  Heart,
  MapPin,
  LogOut,
  ShieldAlert,
  Truck,
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
        <h2 className="text-xl font-bold text-slate-900">
          Inicie sessão para ver a sua conta.
        </h2>
        <button
          onClick={() => setCurrentPage('auth')}
          className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
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
      <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-black text-2xl text-white shadow-lg shadow-blue-600/20">
            {currentUser.name.charAt(0)}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                {currentUser.name}
              </h1>
              <span
                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                  currentUser.role === 'admin'
                    ? 'bg-purple-50 text-purple-700 border border-purple-200'
                    : 'bg-blue-50 text-blue-700 border border-blue-200'
                }`}
              >
                {currentUser.role === 'admin' ? 'Administrador' : 'Cliente Moçambique'}
              </span>
            </div>
            <div className="text-xs text-slate-600 mt-1">
              {currentUser.email} • {currentUser.phone}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {currentUser.role === 'admin' && (
            <button
              onClick={() => setCurrentPage('admin')}
              className="px-4 py-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 font-bold text-xs flex items-center gap-1.5 transition-colors"
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
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 font-semibold text-xs flex items-center gap-1.5 transition-colors border border-slate-200 hover:border-rose-200"
          >
            <LogOut className="w-4 h-4" />
            <span>Sair</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'orders'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Histórico de Encomendas ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('wishlist')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'wishlist'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Favoritos ({wishlist.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
            activeTab === 'profile'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
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
                className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6 space-y-4 text-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
                  <div>
                    <span className="font-mono font-bold text-base text-slate-900">
                      #{order.id}
                    </span>
                    <span className="text-slate-500 ml-3">
                      {formatDate(order.createdAt)}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 uppercase">
                      {order.status.replace('_', ' ')}
                    </span>
                    <button
                      onClick={() => setCurrentPage('order-tracking')}
                      className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 font-bold text-xs flex items-center gap-1.5 transition-colors"
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
                      className="flex items-center justify-between text-slate-700"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-10 h-10 rounded-xl object-cover bg-slate-50 border border-slate-200"
                        />
                        <div>
                          <div className="font-semibold text-slate-900">
                            {item.product.name}
                          </div>
                          <div className="text-slate-500 text-[11px]">
                            {item.quantity}x {formatMZN(item.product.price)}
                          </div>
                        </div>
                      </div>
                      <span className="font-bold text-slate-900">
                        {formatMZN(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-between items-center text-slate-600">
                  <span>
                    Entrega em: <strong className="text-slate-900">{order.city}, {order.province}</strong>
                  </span>
                  <div className="text-sm font-black text-slate-900">
                    Total: <span className="text-blue-700">{formatMZN(order.total)}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center rounded-3xl bg-slate-50 border border-slate-200 text-slate-600">
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
            <div className="p-8 text-center rounded-3xl bg-slate-50 border border-slate-200 text-slate-600">
              A sua lista de favoritos está vazia.
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Profile & Address */}
      {activeTab === 'profile' && (
        <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4 max-w-xl text-xs">
          <h3 className="text-base font-bold text-slate-900 mb-2">
            Morada de Entrega Principal em Moçambique
          </h3>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
            <div>
              <span className="text-slate-500 block">Nome:</span>
              <span className="font-bold text-slate-900 text-sm">{currentUser.name}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Zona (Maputo / Matola):</span>
              <span className="font-medium text-slate-800">
                {currentUser.address?.province || 'Maputo Cidade'}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Bairro / Cidade:</span>
              <span className="font-medium text-slate-800">
                {currentUser.address?.city || 'Polana'}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">Rua & Ponto de Referência:</span>
              <span className="font-medium text-slate-800">
                {currentUser.address?.street || 'Av. Julius Nyerere nº 1840'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
