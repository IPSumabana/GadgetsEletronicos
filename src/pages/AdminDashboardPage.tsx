import React, { useState } from 'react';
import {
  ShieldAlert,
  Package,
  ShoppingCart,
  TrendingUp,
  Plus,
  Trash2,
  Download,
  RotateCcw,
  Tag,
  AlertTriangle,
  Search,
  X,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatMZN, formatDate } from '../utils/formatters';
import { OrderStatus, ProductCategory } from '../types';
import { CATEGORIES } from '../data/mockData';

export const AdminDashboardPage: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    coupons,
    resetDemoData,
    currentUser,
    login,
    showToast,
  } = useStore();

  const [activeAdminTab, setActiveAdminTab] = useState<
    'overview' | 'products' | 'orders' | 'coupons' | 'reports'
  >('overview');

  // Product CRUD modal state
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);
  const [productSearch, setProductSearch] = useState('');
  const [orderFilterStatus, setOrderFilterStatus] = useState<string>('all');

  // New Product Form state
  const [newProdName, setNewProdName] = useState('');
  const [newProdBrand, setNewProdBrand] = useState('');
  const [newProdCat, setNewProdCat] = useState<ProductCategory>('laptops');
  const [newProdPrice, setNewProdPrice] = useState<number>(45000);
  const [newProdStock, setNewProdStock] = useState<number>(5);
  const [newProdSku] = useState('GZ-NEW-01');
  const [newProdImage, setNewProdImage] = useState(
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'
  );
  const [newProdDesc, setNewProdDesc] = useState('Equipamento topo de gama com garantia em Moçambique.');

  // Quick unlock for demo testing if not admin
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-3xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">
          Painel Administrativo Protegido
        </h2>
        <p className="text-xs sm:text-sm text-slate-600">
          Esta área é reservada para a gestão de produtos, stock, encomendas e finanças da GADGETSZONE LDA.
        </p>
        <button
          onClick={() => login('admin@gadgetszone.co.mz', 'admin')}
          className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/20 transition-all"
        >
          Autenticar como Administrador Demo
        </button>
      </div>
    );
  }

  // KPIs Calculations
  const totalSalesMZN = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrdersCount = orders.length;
  const averageTicketMZN = totalOrdersCount > 0 ? Math.round(totalSalesMZN / totalOrdersCount) : 0;
  const lowStockProducts = products.filter((p) => p.stock <= 4);

  // Filtered Products for Admin Table
  const filteredProducts = products.filter((p) => {
    if (!productSearch.trim()) return true;
    const q = productSearch.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q)
    );
  });

  // Filtered Orders for Admin Table
  const filteredOrders = orders.filter((o) => {
    if (orderFilterStatus === 'all') return true;
    return o.status === orderFilterStatus;
  });

  // Create Product handler
  const handleSaveNewProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const catObj = CATEGORIES.find((c) => c.id === newProdCat);
    addProduct({
      name: newProdName,
      slug: newProdName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      brand: newProdBrand || 'Genérica',
      category: newProdCat,
      categoryName: catObj?.name || 'Tecnologia',
      price: Number(newProdPrice),
      stock: Number(newProdStock),
      sku: newProdSku || `GZ-${Date.now()}`,
      images: [newProdImage],
      shortDescription: newProdDesc,
      fullDescription: newProdDesc,
      specifications: {
        'Garantia': '12 Meses em Moçambique',
        'Estado': 'Novo e Selado',
      },
      features: ['Equipamento original selado', 'Garantia de 12 meses'],
      warrantyMonths: 12,
      tags: [newProdCat, 'novo', 'tecnologia'],
    });

    setIsCreatingProduct(false);
    setNewProdName('');
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = 'ID,Cliente,Email,Telefone,Provincia,Total_MZN,Status,Data\n';
    const rows = orders
      .map(
        (o) =>
          `"${o.id}","${o.customerName}","${o.email}","${o.phone}","${o.province}",${o.total},"${o.status}","${o.createdAt}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `gadgetszone_encomendas_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Relatório de encomendas exportado para CSV com sucesso!', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-purple-50 text-purple-600 border border-purple-200">
              <ShieldAlert className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              Painel de Gestão GADGETSZONE
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Gestão integrada de inventário, encomendas, métodos de pagamento e clientes em Moçambique.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={resetDemoData}
            className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 border border-slate-200 transition-colors"
            title="Repor dados originais"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Repor Demo</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exportar CSV</span>
          </button>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 text-xs">
        {[
          { id: 'overview', label: 'Dashboard & Finanças', icon: TrendingUp },
          { id: 'products', label: `Produtos (${products.length})`, icon: Package },
          { id: 'orders', label: `Encomendas (${orders.length})`, icon: ShoppingCart },
          { id: 'coupons', label: `Cupões de Desconto (${coupons.length})`, icon: Tag },
          { id: 'reports', label: 'Relatórios & Exportação', icon: Download },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveAdminTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold whitespace-nowrap transition-all ${
                activeAdminTab === tab.id
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW & FINANCIAL METRICS */}
      {activeAdminTab === 'overview' && (
        <div className="space-y-8">
          {/* Top 4 KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Volume de Vendas em Moçambique
              </span>
              <div className="text-2xl font-black text-slate-900">
                {formatMZN(totalSalesMZN)}
              </div>
              <div className="text-[11px] text-emerald-700 flex items-center gap-1 font-semibold">
                <span>↑ +18.4%</span>
                <span className="text-slate-500 font-normal">face ao mês anterior</span>
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Total de Encomendas
              </span>
              <div className="text-2xl font-black text-slate-900">
                {totalOrdersCount}
              </div>
              <div className="text-[11px] text-blue-700 font-semibold">
                M-Pesa e Transferências IZI activas
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Ticket Médio por Encomenda
              </span>
              <div className="text-2xl font-black text-slate-900">
                {formatMZN(averageTicketMZN)}
              </div>
              <div className="text-[11px] text-slate-500">
                Segmento de alta gama tech
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Alertas de Stock Baixo
              </span>
              <div className="text-2xl font-black text-amber-600">
                {lowStockProducts.length} itens
              </div>
              <div className="text-[11px] text-amber-700 font-medium">
                Necessitam reposição imediata
              </div>
            </div>
          </div>

          {/* Low Stock Warning Box */}
          {lowStockProducts.length > 0 && (
            <div className="p-5 rounded-3xl bg-amber-50 border border-amber-200 space-y-3">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Equipamentos com Stock Crítico (Maputo Hub):</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {lowStockProducts.map((p) => (
                  <div
                    key={p.id}
                    className="p-3 rounded-2xl bg-white border border-amber-200 flex items-center justify-between text-xs shadow-sm"
                  >
                    <div className="truncate mr-2">
                      <div className="font-semibold text-slate-900 truncate">{p.name}</div>
                      <div className="text-slate-500 text-[10px]">SKU: {p.sku}</div>
                    </div>
                    <span className="font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-lg border border-amber-200 flex-shrink-0">
                      Só {p.stock} un.
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Orders Overview Table */}
          <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">
                Últimas Encomendas Realizadas em Moçambique
              </h3>
              <button
                onClick={() => setActiveAdminTab('orders')}
                className="text-xs text-purple-600 hover:text-purple-700 font-semibold"
              >
                Ver Todas as Encomendas →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px]">
                    <th className="pb-3">Código</th>
                    <th className="pb-3">Cliente</th>
                    <th className="pb-3">Província</th>
                    <th className="pb-3">Método</th>
                    <th className="pb-3">Valor Total</th>
                    <th className="pb-3">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {orders.slice(0, 5).map((ord) => (
                    <tr key={ord.id}>
                      <td className="py-3 font-mono font-bold text-slate-900">#{ord.id}</td>
                      <td className="py-3 font-semibold text-slate-800">{ord.customerName}</td>
                      <td className="py-3">{ord.province}</td>
                      <td className="py-3 uppercase text-[10px] text-slate-500">
                        {ord.paymentMethod}
                      </td>
                      <td className="py-3 font-bold text-slate-900">{formatMZN(ord.total)}</td>
                      <td className="py-3">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 uppercase">
                          {ord.status.replace('_', ' ')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCTS MANAGER */}
      {activeAdminTab === 'products' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Filtrar por nome, marca ou SKU..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-purple-600 shadow-sm"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <button
              onClick={() => setIsCreatingProduct(true)}
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Adicionar Novo Produto</span>
            </button>
          </div>

          {/* New Product Modal */}
          {isCreatingProduct && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
              <div className="w-full max-w-xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <h3 className="font-bold text-slate-900 text-base">
                    Adicionar Equipamento ao Catálogo
                  </h3>
                  <button
                    onClick={() => setIsCreatingProduct(false)}
                    className="p-1 text-slate-400 hover:text-slate-900"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveNewProduct} className="space-y-3 text-xs">
                  <div>
                    <label className="text-slate-700 font-semibold block mb-1">
                      Nome do Produto *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Laptop Dell XPS 15 OLED"
                      value={newProdName}
                      onChange={(e) => setNewProdName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 outline-none focus:border-purple-600 focus:bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-700 font-semibold block mb-1">
                        Marca *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Dell / Apple / Sony"
                        value={newProdBrand}
                        onChange={(e) => setNewProdBrand(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 outline-none focus:border-purple-600 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-slate-700 font-semibold block mb-1">
                        Categoria *
                      </label>
                      <select
                        value={newProdCat}
                        onChange={(e) => setNewProdCat(e.target.value as any)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 outline-none focus:border-purple-600 focus:bg-white"
                      >
                        {CATEGORIES.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-700 font-semibold block mb-1">
                        Preço em Meticais (MZN) *
                      </label>
                      <input
                        type="number"
                        required
                        value={newProdPrice}
                        onChange={(e) => setNewProdPrice(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 outline-none focus:border-purple-600 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-slate-700 font-semibold block mb-1">
                        Unidades em Stock *
                      </label>
                      <input
                        type="number"
                        required
                        value={newProdStock}
                        onChange={(e) => setNewProdStock(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 outline-none focus:border-purple-600 focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-700 font-semibold block mb-1">
                      URL da Imagem de Capa
                    </label>
                    <input
                      type="url"
                      value={newProdImage}
                      onChange={(e) => setNewProdImage(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 outline-none focus:border-purple-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-slate-700 font-semibold block mb-1">
                      Descrição Resumida
                    </label>
                    <textarea
                      rows={2}
                      value={newProdDesc}
                      onChange={(e) => setNewProdDesc(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 outline-none focus:border-purple-600 focus:bg-white"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={() => setIsCreatingProduct(false)}
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold"
                    >
                      Guardar Produto
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Products Table */}
          <div className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px] bg-slate-50">
                  <th className="p-4">Produto</th>
                  <th className="p-4">Categoria</th>
                  <th className="p-4">Preço (MZN)</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4 text-right">Acções Rápidas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-10 h-10 rounded-xl object-cover bg-slate-50 border border-slate-200 flex-shrink-0"
                      />
                      <div className="truncate max-w-xs">
                        <div className="font-bold text-slate-900 truncate">{p.name}</div>
                        <div className="text-slate-500 text-[10px]">
                          {p.brand} • SKU: {p.sku}
                        </div>
                      </div>
                    </td>

                    <td className="p-4">{p.categoryName}</td>

                    <td className="p-4 font-bold text-slate-900">
                      {formatMZN(p.price)}
                    </td>

                    <td className="p-4">
                      <span
                        className={`font-semibold ${
                          p.stock <= 3 ? 'text-amber-700' : 'text-slate-700'
                        }`}
                      >
                        {p.stock} unidades
                      </span>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => updateProduct(p.id, { stock: p.stock + 1 })}
                          className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 text-[10px] font-bold"
                          title="Adicionar 1 ao stock"
                        >
                          +1 Stock
                        </button>

                        <button
                          onClick={() => deleteProduct(p.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Apagar Produto"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: ORDERS MANAGER */}
      {activeAdminTab === 'orders' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-600 font-semibold">Filtrar Estado:</span>
            {['all', 'pendente', 'confirmado', 'em_transito', 'entregue'].map((st) => (
              <button
                key={st}
                onClick={() => setOrderFilterStatus(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                  orderFilterStatus === st
                    ? 'bg-purple-600 text-white font-bold'
                    : 'bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {st.replace('_', ' ')}
              </button>
            ))}
          </div>

          <div className="rounded-3xl bg-white border border-slate-200 shadow-sm overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px] bg-slate-50">
                  <th className="p-4">Encomenda</th>
                  <th className="p-4">Cliente / Contacto</th>
                  <th className="p-4">Destino Moçambique</th>
                  <th className="p-4">Pagamento</th>
                  <th className="p-4">Total</th>
                  <th className="p-4">Estado Actual</th>
                  <th className="p-4 text-right">Alterar Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <div className="font-mono font-bold text-slate-900">#{ord.id}</div>
                      <div className="text-[10px] text-slate-500">
                        {formatDate(ord.createdAt)}
                      </div>
                    </td>

                    <td className="p-4">
                      <div className="font-bold text-slate-900">{ord.customerName}</div>
                      <div className="text-[11px] text-slate-500">{ord.phone}</div>
                    </td>

                    <td className="p-4">
                      <div className="text-slate-800">{ord.province}</div>
                      <div className="text-[10px] text-slate-500">{ord.city}</div>
                    </td>

                    <td className="p-4">
                      <span className="uppercase font-bold text-[10px] text-blue-700">
                        {ord.paymentMethod}
                      </span>
                    </td>

                    <td className="p-4 font-black text-slate-900">
                      {formatMZN(ord.total)}
                    </td>

                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 uppercase">
                        {ord.status.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="p-4 text-right">
                      <select
                        value={ord.status}
                        onChange={(e) =>
                          updateOrderStatus(ord.id, e.target.value as OrderStatus)
                        }
                        className="px-2.5 py-1.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 outline-none cursor-pointer focus:border-purple-600"
                      >
                        <option value="pendente">Pendente</option>
                        <option value="confirmado">Confirmado</option>
                        <option value="em_preparacao">Em Preparação</option>
                        <option value="em_transito">Em Trânsito</option>
                        <option value="entregue">Entregue</option>
                        <option value="cancelado">Cancelado</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: COUPONS MANAGER */}
      {activeAdminTab === 'coupons' && (
        <div className="space-y-6 max-w-4xl">
          <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Cupões de Desconto Activos
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {coupons.map((c) => (
                <div
                  key={c.code}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-purple-700 text-sm bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                      {c.code}
                    </span>
                    <span className="text-emerald-700 font-bold">
                      -{c.discountPercent}%
                    </span>
                  </div>
                  <p className="text-slate-600 text-[11px]">{c.description}</p>
                  <div className="text-[10px] text-slate-500 pt-2 border-t border-slate-200">
                    Válido até: {c.validUntil}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: REPORTS & DATA EXPORT */}
      {activeAdminTab === 'reports' && (
        <div className="max-w-2xl space-y-4 text-xs text-slate-700">
          <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Exportação de Dados & Integrações Financeiras
            </h3>
            <p>
              Faça download dos relatórios completos de vendas em Meticais (MZN) e registos de clientes para contabilidade e auditoria fiscal em Moçambique.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleExportCSV}
                className="px-5 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold flex items-center gap-2 shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Descarregar Ficheiro CSV das Encomendas</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
