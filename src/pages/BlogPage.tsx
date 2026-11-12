import React from 'react';
import { BookOpen, Calendar, Clock, ArrowRight, User } from 'lucide-react';
import { BLOG_POSTS } from '../data/mockData';
import { useStore } from '../context/StoreContext';

export const BlogPage: React.FC = () => {
  const { navigateToBlogPost } = useStore();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
          GADGETSZONE Tech Insights
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          Blog & Análises Tecnológicas
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Guias de compra especializados, análises imparciais e novidades do ecossistema tech para o público moçambicano.
        </p>
      </div>

      {/* Featured Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {BLOG_POSTS.map((post) => (
          <article
            key={post.id}
            onClick={() => navigateToBlogPost(post.id)}
            className="group cursor-pointer rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-blue-500/50 p-5 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col justify-between"
          >
            <div>
              <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-slate-950 mb-4 border border-slate-800">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-2">
                <span className="text-blue-400 font-bold uppercase tracking-wider">
                  {post.category}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {post.readTime}
                </span>
              </div>

              <h2 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors line-clamp-2 mb-2 leading-snug">
                {post.title}
              </h2>

              <p className="text-xs text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                {post.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-slate-300 font-medium">{post.author}</span>
              </div>
              <span className="text-blue-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                <span>Ler Artigo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
