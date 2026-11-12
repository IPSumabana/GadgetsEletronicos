import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Order,
  OrderStatus,
  User,
  Coupon,
  ProductCategory,
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_COUPONS,
  MOZAMBIQUE_PROVINCES,
} from '../data/mockData';

export type NavigationPage =
  | 'home'
  | 'shop'
  | 'categories'
  | 'product-detail'
  | 'flash-deals'
  | 'new-arrivals'
  | 'about'
  | 'contact'
  | 'faq'
  | 'blog'
  | 'blog-post'
  | 'cart'
  | 'checkout'
  | 'order-confirmation'
  | 'order-tracking'
  | 'compare'
  | 'policies'
  | 'auth'
  | 'account'
  | 'admin';

interface Toast {
  id: string;
  type: 'success' | 'info' | 'error';
  message: string;
}

interface StoreContextType {
  // Navigation
  currentPage: NavigationPage;
  setCurrentPage: (page: NavigationPage) => void;
  selectedProductId: string | null;
  navigateToProduct: (productId: string) => void;
  selectedBlogPostId: string | null;
  navigateToBlogPost: (postId: string) => void;
  selectedCategory: ProductCategory | 'all';
  setSelectedCategory: (cat: ProductCategory | 'all') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'rating' | 'reviewCount'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  resetDemoData: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedColor?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Compare
  compareList: string[];
  addToCompare: (productId: string) => void;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  isInCompare: (productId: string) => boolean;

  // Coupons
  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  discountAmount: number;

  // Orders
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt'>) => Order;
  updateOrderStatus: (
    orderId: string,
    status: OrderStatus,
    paymentStatus?: 'pendente' | 'confirmado' | 'rejeitado'
  ) => void;
  lastCreatedOrder: Order | null;

  // User / Auth
  currentUser: User | null;
  login: (email: string, role?: 'cliente' | 'admin') => boolean;
  register: (name: string, email: string, phone: string) => boolean;
  logout: () => void;

  // UI state
  quickViewProduct: Product | null;
  setQuickViewProduct: (prod: Product | null) => void;
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;

  // Marketing
  newsletterSubscribed: boolean;
  subscribeNewsletter: (email: string) => boolean;
  showAbandonedCartModal: boolean;
  setShowAbandonedCartModal: (show: boolean) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Navigation State
  const [currentPage, setCurrentPage] = useState<NavigationPage>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedBlogPostId, setSelectedBlogPostId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('gadgetszone_products_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('gadgetszone_products_v2', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('gadgetszone_cart_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem('gadgetszone_cart_v2', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('gadgetszone_wishlist');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [INITIAL_PRODUCTS[0].id, INITIAL_PRODUCTS[3].id];
  });

  useEffect(() => {
    try {
      localStorage.setItem('gadgetszone_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Compare
  const [compareList, setCompareList] = useState<string[]>([]);

  // Coupons
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('gadgetszone_orders_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_ORDERS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('gadgetszone_orders_v2', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  const [lastCreatedOrder, setLastCreatedOrder] = useState<Order | null>(null);

  // Current User (default: logged in as demo client so everything is immediately testable)
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('gadgetszone_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {
      id: 'usr-demo-01',
      name: 'Armando Guambe',
      email: 'armando.guambe@gmail.com',
      phone: '+258 84 123 4567',
      role: 'cliente',
      address: {
        province: 'Maputo Cidade',
        city: 'Polana',
        street: 'Av. Julius Nyerere, nº 1840',
      },
    };
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('gadgetszone_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('gadgetszone_user');
    }
  }, [currentUser]);

  // UI States
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [showAbandonedCartModal, setShowAbandonedCartModal] = useState(false);

  // Abandoned Cart Detection (simulated trigger after 45s if cart has items)
  useEffect(() => {
    if (cart.length > 0 && !sessionStorage.getItem('abandoned_cart_shown')) {
      const timer = setTimeout(() => {
        if (currentPage !== 'checkout' && currentPage !== 'order-confirmation') {
          setShowAbandonedCartModal(true);
          sessionStorage.setItem('abandoned_cart_shown', 'true');
        }
      }, 55000);
      return () => clearTimeout(timer);
    }
  }, [cart.length, currentPage]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Navigation helpers
  const navigateToProduct = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToBlogPost = (postId: string) => {
    setSelectedBlogPostId(postId);
    setCurrentPage('blog-post');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart Helpers
  const addToCart = (product: Product, quantity = 1, selectedColor?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: Math.min(newQty, product.stock),
        };
        return updated;
      }
      return [...prev, { product, quantity, selectedColor }];
    });
    showToast(`"${product.name.slice(0, 30)}..." adicionado ao carrinho!`, 'success');
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removido do carrinho.', 'info');
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          return {
            ...item,
            quantity: Math.min(quantity, item.product.stock),
          };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  // Wishlist Helpers
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Item removido dos favoritos.', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Item guardado nos favoritos! ❤️', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Compare Helpers
  const addToCompare = (productId: string) => {
    if (compareList.length >= 4) {
      showToast('Pode comparar no máximo 4 produtos simultaneamente.', 'error');
      return;
    }
    if (!compareList.includes(productId)) {
      setCompareList((prev) => [...prev, productId]);
      showToast('Produto adicionado à comparação!', 'success');
    }
  };

  const removeFromCompare = (productId: string) => {
    setCompareList((prev) => prev.filter((id) => id !== productId));
  };

  const clearCompare = () => setCompareList([]);
  const isInCompare = (productId: string) => compareList.includes(productId);

  // Coupon Helpers
  const applyCoupon = (code: string): boolean => {
    const trimmed = code.trim().toUpperCase();
    const coupon = coupons.find((c) => c.code.toUpperCase() === trimmed && c.active);
    if (!coupon) {
      showToast('Código de cupão inválido ou expirado.', 'error');
      return false;
    }
    if (cartSubtotal < coupon.minOrder) {
      showToast(
        `O valor mínimo para usar este cupão é de ${coupon.minOrder.toLocaleString()} MT.`,
        'error'
      );
      return false;
    }
    setAppliedCoupon(coupon);
    showToast(`Cupão ${coupon.code} aplicado com sucesso! Desconto de ${coupon.discountPercent}%.`, 'success');
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Cupão removido.', 'info');
  };

  const discountAmount = appliedCoupon
    ? Math.round((cartSubtotal * appliedCoupon.discountPercent) / 100)
    : 0;

  // Order Creation
  const createOrder = (orderData: Omit<Order, 'id' | 'createdAt'>): Order => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const newOrder: Order = {
      ...orderData,
      id: `GZ-${randomNum}`,
      createdAt: new Date().toISOString(),
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastCreatedOrder(newOrder);

    // Reduzir o stock dos produtos comprados
    setProducts((prev) =>
      prev.map((prod) => {
        const itemInOrder = orderData.items.find((i) => i.product.id === prod.id);
        if (itemInOrder) {
          return {
            ...prod,
            stock: Math.max(0, prod.stock - itemInOrder.quantity),
          };
        }
        return prod;
      })
    );

    clearCart();
    setAppliedCoupon(null);
    return newOrder;
  };

  const updateOrderStatus = (
    orderId: string,
    status: OrderStatus,
    paymentStatus?: 'pendente' | 'confirmado' | 'rejeitado'
  ) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          return {
            ...ord,
            status,
            paymentStatus: paymentStatus || ord.paymentStatus,
          };
        }
        return ord;
      })
    );
    showToast(`Estado da encomenda #${orderId} atualizado para "${status}".`, 'info');
  };

  // Product Admin Operations
  const addProduct = (newProd: Omit<Product, 'id' | 'rating' | 'reviewCount'>) => {
    const product: Product = {
      ...newProd,
      id: `gz-prod-${Date.now()}`,
      rating: 5.0,
      reviewCount: 0,
    };
    setProducts((prev) => [product, ...prev]);
    showToast(`Produto "${product.name}" adicionado ao catálogo!`, 'success');
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    showToast('Produto atualizado com sucesso.', 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Produto removido do catálogo.', 'info');
  };

  const resetDemoData = () => {
    setProducts(INITIAL_PRODUCTS);
    setOrders(INITIAL_ORDERS);
    setCoupons(INITIAL_COUPONS);
    localStorage.removeItem('gadgetszone_products_v2');
    localStorage.removeItem('gadgetszone_orders_v2');
    showToast('Dados de demonstração restaurados com sucesso!', 'info');
  };

  // Auth Operations
  const login = (email: string, role: 'cliente' | 'admin' = 'cliente'): boolean => {
    const user: User = {
      id: role === 'admin' ? 'usr-admin-01' : 'usr-client-01',
      name: role === 'admin' ? 'Administrador GADGETSZONE' : 'Armando Guambe',
      email: email || (role === 'admin' ? 'admin@gadgetszone.co.mz' : 'armando.guambe@gmail.com'),
      phone: '+258 84 990 0110',
      role,
      address: {
        province: 'Maputo Cidade',
        city: 'Polana Cimento',
        street: 'Av. 24 de Julho nº 1420',
      },
    };
    setCurrentUser(user);
    showToast(`Sessão iniciada como ${user.role === 'admin' ? 'Administrador' : 'Cliente'}.`, 'success');
    return true;
  };

  const register = (name: string, email: string, phone: string): boolean => {
    const user: User = {
      id: `usr-${Date.now()}`,
      name,
      email,
      phone,
      role: 'cliente',
    };
    setCurrentUser(user);
    showToast('Conta criada com sucesso! Bem-vindo à GADGETSZONE.', 'success');
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Sessão terminada.', 'info');
  };

  // Marketing operations
  const subscribeNewsletter = (email: string): boolean => {
    if (!email || !email.includes('@')) {
      showToast('Por favor insira um e-mail válido.', 'error');
      return false;
    }
    setNewsletterSubscribed(true);
    showToast('Subscrição confirmada! Use o cupão BEMVINDO10 para 10% de desconto.', 'success');
    return true;
  };

  return (
    <StoreContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedProductId,
        navigateToProduct,
        selectedBlogPostId,
        navigateToBlogPost,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,

        products,
        addProduct,
        updateProduct,
        deleteProduct,
        resetDemoData,

        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,

        wishlist,
        toggleWishlist,
        isInWishlist,

        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,

        coupons,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        discountAmount,

        orders,
        createOrder,
        updateOrderStatus,
        lastCreatedOrder,

        currentUser,
        login,
        register,
        logout,

        quickViewProduct,
        setQuickViewProduct,
        toasts,
        showToast,
        removeToast,

        newsletterSubscribed,
        subscribeNewsletter,
        showAbandonedCartModal,
        setShowAbandonedCartModal,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
