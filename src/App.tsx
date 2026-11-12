import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { QuickViewModal } from './components/common/QuickViewModal';
import { ToastContainer } from './components/common/ToastContainer';
import { AbandonedCartModal } from './components/common/AbandonedCartModal';
import { CookieConsent } from './components/common/CookieConsent';
import { FloatingWhatsApp } from './components/common/FloatingWhatsApp';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { SEOHead } from './components/common/SEOHead';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { FlashDealsPage } from './pages/FlashDealsPage';
import { NewArrivalsPage } from './pages/NewArrivalsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { ComparePage } from './pages/ComparePage';
import { PoliciesPage } from './pages/PoliciesPage';
import { AuthPage } from './pages/AuthPage';
import { AccountPage } from './pages/AccountPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

const AppContent: React.FC = () => {
  const { currentPage } = useStore();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'categories':
        return <CategoriesPage />;
      case 'product-detail':
        return <ProductDetailPage />;
      case 'flash-deals':
        return <FlashDealsPage />;
      case 'new-arrivals':
        return <NewArrivalsPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'faq':
        return <FAQPage />;
      case 'blog':
        return <BlogPage />;
      case 'blog-post':
        return <BlogPostPage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'order-confirmation':
        return <OrderConfirmationPage />;
      case 'order-tracking':
        return <OrderTrackingPage />;
      case 'compare':
        return <ComparePage />;
      case 'policies':
        return <PoliciesPage />;
      case 'auth':
        return <AuthPage />;
      case 'account':
        return <AccountPage />;
      case 'admin':
        return <AdminDashboardPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080c14] text-slate-100 selection:bg-blue-600 selection:text-white">
      {/* Dynamic SEO & Head Tags */}
      <SEOHead />

      {/* Main Navigation */}
      <Navbar />

      {/* Page Content View */}
      <main className="flex-1 pb-16 md:pb-0">
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav />

      {/* Global Modals & Floating Interactive Elements */}
      <QuickViewModal />
      <ToastContainer />
      <AbandonedCartModal />
      <CookieConsent />
      <FloatingWhatsApp />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
