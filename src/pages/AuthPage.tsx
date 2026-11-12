import React, { useState } from 'react';
import { Lock, Mail, Phone, User as UserIcon, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AuthPage: React.FC = () => {
  const { login, register, setCurrentPage, currentUser } = useStore();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+258 84 ');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, email.includes('admin') ? 'admin' : 'cliente');
    setCurrentPage('account');
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(name, email, phone);
    setCurrentPage('account');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 space-y-8">
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          {mode === 'login' ? 'Iniciar Sessão' : 'Criar Nova Conta'}
        </h1>
        <p className="text-xs text-slate-400">
          Aceda ao seu histórico de encomendas e acompanhe entregas em Moçambique.
        </p>
      </div>

      {/* Fast Demo Accounts Helper Banner */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-indigo-500/30 text-xs space-y-2">
        <span className="font-bold text-indigo-400 block">
          Acesso Rápido para Avaliação (Modo Demo):
        </span>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => {
              login('armando.guambe@gmail.com', 'cliente');
              setCurrentPage('account');
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-[11px] border border-slate-700"
          >
            👤 Entrar como Cliente
          </button>
          <button
            type="button"
            onClick={() => {
              login('admin@gadgetszone.co.mz', 'admin');
              setCurrentPage('admin');
            }}
            className="p-2 rounded-xl bg-purple-950/80 hover:bg-purple-900 text-purple-300 font-bold text-[11px] border border-purple-800"
          >
            🛡️ Entrar como Admin
          </button>
        </div>
      </div>

      {/* Main Auth Card */}
      <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 space-y-6">
        {/* Toggle Mode */}
        <div className="grid grid-cols-2 p-1 bg-slate-950 rounded-2xl border border-slate-800">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`py-2 text-xs font-bold rounded-xl transition-all ${
              mode === 'login'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Entrar
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`py-2 text-xs font-bold rounded-xl transition-all ${
              mode === 'register'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Registar
          </button>
        </div>

        {mode === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                E-mail ou Telemóvel
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="armando.guambe@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white outline-none focus:border-blue-500"
                />
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Palavra-passe
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white outline-none focus:border-blue-500"
                />
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30 transition-all active:scale-[0.98]"
            >
              <span>Entrar na Minha Conta</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Nome Completo *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Ex: Armando Guambe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white outline-none focus:border-blue-500"
                />
                <UserIcon className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                E-mail *
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="seuemail@exemplo.co.mz"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white outline-none focus:border-blue-500"
                />
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Telemóvel Moçambicano (M-Pesa / e-Mola) *
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  placeholder="+258 84 123 4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white outline-none focus:border-blue-500"
                />
                <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30 transition-all active:scale-[0.98]"
            >
              <span>Concluir Registo</span>
              <Check className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
