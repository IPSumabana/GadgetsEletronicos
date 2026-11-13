import React, { useState, useEffect } from 'react';
import { Cookie, Settings2 } from 'lucide-react';

export const CookieConsent: React.FC = () => {
  const [show, setShow] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [marketingEnabled, setMarketingEnabled] = useState(true);

  useEffect(() => {
    const consent = localStorage.getItem('gadgetszone_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem(
      'gadgetszone_cookie_consent',
      JSON.stringify({ necessary: true, analytics: true, marketing: true, timestamp: Date.now() })
    );
    setShow(false);
  };

  const handleReject = () => {
    localStorage.setItem(
      'gadgetszone_cookie_consent',
      JSON.stringify({ necessary: true, analytics: false, marketing: false, timestamp: Date.now() })
    );
    setShow(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem(
      'gadgetszone_cookie_consent',
      JSON.stringify({ necessary: true, analytics: analyticsEnabled, marketing: marketingEnabled, timestamp: Date.now() })
    );
    setShow(false);
    setShowPreferences(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-20 md:bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-40 bg-white/95 border border-slate-200 rounded-3xl p-5 shadow-2xl backdrop-blur-xl animate-in slide-in-from-bottom-5">
      <div className="flex items-start gap-3 mb-3">
        <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex-shrink-0">
          <Cookie className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <span>Privacidade & Consentimento de Cookies</span>
          </h4>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">
            Utilizamos cookies para melhorar a navegação, personalizar promoções em Meticais e integrar ferramentas analíticas (Google Analytics 4 e Meta Pixel).
          </p>
        </div>
      </div>

      {showPreferences && (
        <div className="my-3 p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-slate-700 font-medium">Cookies Essenciais (Obrigatórios)</span>
            <span className="text-emerald-700 font-bold text-[10px] bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">Activo</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-700">Cookies de Desempenho (GA4)</span>
            <input
              type="checkbox"
              checked={analyticsEnabled}
              onChange={(e) => setAnalyticsEnabled(e.target.checked)}
              className="accent-blue-600 rounded cursor-pointer"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-700">Cookies de Marketing (Meta Pixel / Ads)</span>
            <input
              type="checkbox"
              checked={marketingEnabled}
              onChange={(e) => setMarketingEnabled(e.target.checked)}
              className="accent-blue-600 rounded cursor-pointer"
            />
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200">
        {showPreferences ? (
          <button
            onClick={handleSavePreferences}
            className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors"
          >
            Guardar Preferências
          </button>
        ) : (
          <>
            <button
              onClick={handleAcceptAll}
              className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold transition-all shadow-sm"
            >
              Aceitar Todos
            </button>
            <button
              onClick={handleReject}
              className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
            >
              Rejeitar
            </button>
            <button
              onClick={() => setShowPreferences(!showPreferences)}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 transition-colors"
              title="Personalizar"
            >
              <Settings2 className="w-4 h-4" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
