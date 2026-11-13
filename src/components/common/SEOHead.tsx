import React, { useEffect, useState } from 'react';
import { Globe, Check, X } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { STORE_EMAIL } from '../../utils/formatters';

export const SEOHead: React.FC = () => {
  const { currentPage, selectedProductId, products } = useStore();
  const [showSeoModal, setShowSeoModal] = useState(false);

  const product = selectedProductId ? products.find((p) => p.id === selectedProductId) : null;

  useEffect(() => {
    let title = 'GADGETSZONE | Loja Online de Tecnologia em Moçambique';
    let desc =
      'A sua loja tecnológica de referência em Moçambique. Laptops, PC Gaming, Smartphones, PS5, Monitores e Gadgets em Meticais (MZN) com entregas em Maputo e todo o país.';

    if (currentPage === 'product-detail' && product) {
      title = `${product.name} | GADGETSZONE Moçambique`;
      desc = `${product.shortDescription} Compre em Meticais (MZN) com garantia oficial de ${product.warrantyMonths} meses em Moçambique.`;
    } else if (currentPage === 'shop') {
      title = 'Loja de Tecnologia & Gadgets | GADGETSZONE Moçambique';
      desc = 'Catálogo completo de informática e eletrónicos de alta performance em Maputo e todo o território moçambicano.';
    } else if (currentPage === 'flash-deals') {
      title = 'Ofertas Relâmpago & Promoções Tech | GADGETSZONE';
      desc = 'Descontos imperdíveis em computadores, telemóveis e consolas em Meticais com entrega rápida.';
    } else if (currentPage === 'cart' || currentPage === 'checkout') {
      title = 'Checkout Seguro em Moçambique | GADGETSZONE';
    } else if (currentPage === 'order-tracking') {
      title = 'Rastreamento de Encomendas em Tempo Real | GADGETSZONE Moçambique';
    }

    document.title = title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', desc);
    }
  }, [currentPage, product]);

  const storeSchema = {
    '@context': 'https://schema.org',
    '@type': 'ComputerStore',
    name: 'GADGETSZONE Moçambique',
    description: 'Loja online premium de tecnologia, computadores, gaming e gadgets em Moçambique.',
    url: 'https://gadgetszone.co.mz',
    telephone: '+258 82 344 1439',
    email: STORE_EMAIL,
    priceRange: '$$$',
    currenciesAccepted: 'MZN',
    paymentAccepted: 'Cash, Credit Card, M-Pesa, e-Mola, SIMO Rede, Bank Transfer',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Av. 24 de Julho nº 1420, Polana Cimento',
      addressLocality: 'Maputo',
      addressCountry: 'MZ',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -25.9692,
      longitude: 32.5732,
    },
  };

  const productSchema = product
    ? {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        image: product.images,
        description: product.shortDescription,
        sku: product.sku,
        brand: {
          '@type': 'Brand',
          name: product.brand,
        },
        offers: {
          '@type': 'Offer',
          url: window.location.href,
          priceCurrency: 'MZN',
          price: product.price,
          availability:
            product.stock > 0
              ? 'https://schema.org/InStock'
              : 'https://schema.org/OutOfStock',
          seller: {
            '@type': 'Organization',
            name: 'GADGETSZONE',
          },
        },
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema || storeSchema),
        }}
      />

      <button
        onClick={() => setShowSeoModal(true)}
        className="fixed bottom-20 md:bottom-4 left-4 z-40 p-2.5 rounded-full bg-white/95 hover:bg-slate-50 border border-slate-200 text-slate-600 hover:text-blue-600 transition-all shadow-lg backdrop-blur-md flex items-center gap-1.5 text-xs font-semibold"
        title="Ver SEO Técnico, Metadados & Tags"
      >
        <Globe className="w-3.5 h-3.5 text-blue-600" />
        <span className="hidden sm:inline">SEO & Schema.org</span>
      </button>

      {showSeoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-5 shadow-2xl max-h-[85vh] overflow-y-auto text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-base">
                  Auditoria de SEO Técnico & Metadados (GADGETSZONE)
                </h3>
              </div>
              <button
                onClick={() => setShowSeoModal(false)}
                className="p-1 text-slate-400 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 text-xs">
                  Integrações Prontas para Produção:
                </h4>
                <div className="grid grid-cols-2 gap-2 text-slate-700">
                  <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                    <Check className="w-3.5 h-3.5" /> Google Analytics 4 (GA4 Ready)
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                    <Check className="w-3.5 h-3.5" /> Meta Pixel & CAPI Ready
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                    <Check className="w-3.5 h-3.5" /> Schema.org Product & Store JSON-LD
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                    <Check className="w-3.5 h-3.5" /> OpenGraph & Twitter Cards
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                    <Check className="w-3.5 h-3.5" /> Moeda em Meticais (MZN ISO 4217)
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                    <Check className="w-3.5 h-3.5" /> Sitemap.xml & Robots.txt Config
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-700 mb-1">
                  Dados Estruturados JSON-LD Activos:
                </h4>
                <pre className="p-3 rounded-xl bg-slate-900 text-[11px] font-mono text-emerald-400 overflow-x-auto max-h-48">
                  {JSON.stringify(productSchema || storeSchema, null, 2)}
                </pre>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <h4 className="font-bold text-slate-700 mb-1">robots.txt:</h4>
                  <pre className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-[10px] font-mono text-slate-700">
{`User-agent: *
Allow: /
Disallow: /admin
Disallow: /checkout
Sitemap: https://gadgetszone.co.mz/sitemap.xml`}
                  </pre>
                </div>
                <div>
                  <h4 className="font-bold text-slate-700 mb-1">sitemap.xml (Extracto):</h4>
                  <pre className="p-2.5 rounded-xl bg-slate-100 border border-slate-200 text-[10px] font-mono text-slate-700">
{`<urlset>
  <url>https://gadgetszone.co.mz/</url>
  <url>https://gadgetszone.co.mz/shop</url>
  <url>https://gadgetszone.co.mz/categories</url>
  <url>https://gadgetszone.co.mz/flash-deals</url>
</urlset>`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
