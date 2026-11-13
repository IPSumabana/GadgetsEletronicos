import React from 'react';
import { ArrowLeft, Clock, Calendar, Tag, ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '../data/mockData';
import { useStore } from '../context/StoreContext';

export const BlogPostPage: React.FC = () => {
  const { selectedBlogPostId, setCurrentPage } = useStore();

  const post = BLOG_POSTS.find((p) => p.id === selectedBlogPostId) || BLOG_POSTS[0];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Back button */}
      <button
        onClick={() => setCurrentPage('blog')}
        className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1.5 transition-colors font-medium"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Voltar a Todos os Artigos</span>
      </button>

      {/* Article Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full uppercase">
            {post.category}
          </span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-600 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {post.readTime}
          </span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-600 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> {post.date}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-3 pt-2 border-t border-slate-200">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white text-xs">
            {post.author.charAt(0)}
          </div>
          <div className="text-xs">
            <div className="font-bold text-slate-900">{post.author}</div>
            <div className="text-slate-500 text-[11px]">{post.authorRole}</div>
          </div>
        </div>
      </div>

      {/* Featured Cover Image */}
      <div className="aspect-[16/9] rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-md">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Body Content */}
      <div className="max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-6">
        <p className="text-lg text-slate-900 font-medium leading-relaxed">
          {post.excerpt}
        </p>

        <div className="whitespace-pre-line text-slate-700 space-y-4 leading-relaxed">
          {post.content}
        </div>

        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-2">
          <h4 className="font-bold text-slate-900">Recomendação da Equipa GADGETSZONE:</h4>
          <p>
            Antes de comprar qualquer equipamento de informática em Moçambique, verifique sempre a garantia local e a compatibilidade eléctrica (220V standard). A equipa da GADGETSZONE presta consultoria gratuita antes de qualquer compra.
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-6 border-t border-slate-200">
          <Tag className="w-4 h-4 text-slate-400" />
          {post.tags.map((t) => (
            <span
              key={t}
              className="text-xs text-slate-600 bg-slate-50 px-3 py-1 rounded-xl border border-slate-200"
            >
              #{t}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom CTA to shop */}
      <div className="p-6 rounded-3xl bg-blue-50 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-slate-900 text-sm">
            Gostou deste artigo? Explore a nossa loja online!
          </h4>
          <p className="text-xs text-slate-600">
            Encontre os equipamentos mencionados com entrega rápida em Moçambique.
          </p>
        </div>
        <button
          onClick={() => setCurrentPage('shop')}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-2 flex-shrink-0"
        >
          <span>Ir para a Loja</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
