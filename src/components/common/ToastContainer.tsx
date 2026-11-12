import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl shadow-2xl border backdrop-blur-xl transition-all duration-300 animate-in slide-in-from-bottom-5 ${
            toast.type === 'success'
              ? 'bg-slate-900/95 border-emerald-500/40 text-slate-100 shadow-emerald-500/10'
              : toast.type === 'error'
              ? 'bg-slate-900/95 border-rose-500/40 text-slate-100 shadow-rose-500/10'
              : 'bg-slate-900/95 border-blue-500/40 text-slate-100 shadow-blue-500/10'
          }`}
        >
          <div className="flex-shrink-0 mt-0.5">
            {toast.type === 'success' && (
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            )}
            {toast.type === 'error' && (
              <AlertCircle className="w-5 h-5 text-rose-400" />
            )}
            {toast.type === 'info' && <Info className="w-5 h-5 text-blue-400" />}
          </div>

          <div className="flex-1 text-sm font-medium leading-snug">
            {toast.message}
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="flex-shrink-0 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
