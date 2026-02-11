
import React, { useState } from 'react';
import { useCMS } from '../store';
import { Calendar, User, ArrowRight, HeartPulse, Brain, Leaf } from 'lucide-react';
import { handleNavigate } from '../components/Layout';

export const Blog = () => {
  const { state } = useCMS();
  const [filter, setFilter] = useState('All');
  const [selectedPost, setSelectedPost] = useState<string | null>(null);

  const categories = ['All', 'Health', 'Wellness', 'Culinary'];
  const posts = state.blogs.filter(p => filter === 'All' || p.category === filter);

  const activePost = state.blogs.find(b => b.id === selectedPost);

  if (selectedPost && activePost) {
    return (
      <div className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <button onClick={() => setSelectedPost(null)} className="text-red-700 font-bold mb-8 flex items-center gap-2 hover:gap-3 transition-all">
            <ArrowRight size={20} className="rotate-180" /> Back to Feed
          </button>
          <div className="relative w-full h-[400px] mb-10">
            <img 
              src={activePost.image} 
              className="w-full h-full object-cover rounded-3xl shadow-2xl bg-stone-100" 
              alt={activePost.title} 
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=1000';
              }}
            />
          </div>
          <div className="flex items-center gap-6 text-stone-500 mb-6">
            <span className="flex items-center gap-2"><Calendar size={18} /> {new Date(activePost.date).toLocaleDateString()}</span>
            <span className="flex items-center gap-2"><User size={18} /> {activePost.author}</span>
            <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full uppercase">{activePost.category}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-8 leading-tight">{activePost.title}</h1>
          <div className="prose prose-xl prose-stone max-w-none text-stone-700 leading-relaxed whitespace-pre-wrap">
            {activePost.content}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-stone-900 mb-4">Spice Wellness & Wisdom</h1>
          <p className="text-stone-500 text-xl max-w-2xl mx-auto">Explore the deep connection between ancient spices and modern health.</p>
          <div className="h-1 w-24 bg-red-700 mx-auto mt-6 rounded-full"></div>
        </header>

        {/* Categories */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-8 py-3 rounded-full font-bold transition-all shadow-sm ${filter === c ? 'bg-red-700 text-white' : 'bg-white text-stone-600 hover:bg-stone-100'}`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map(post => (
            <div 
              key={post.id} 
              className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group cursor-pointer flex flex-col h-full"
              onClick={() => setSelectedPost(post.id)}
            >
              <div className="relative h-64 overflow-hidden bg-stone-100">
                <img 
                  src={post.image} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700" 
                  alt={post.title} 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=1000';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <span className="text-white font-bold flex items-center gap-2">Read Full Article <ArrowRight size={18} /></span>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-4">
                  {post.category === 'Health' && <HeartPulse size={16} className="text-red-600" />}
                  {post.category === 'Wellness' && <Brain size={16} className="text-blue-600" />}
                  {post.category === 'Culinary' && <Leaf size={16} className="text-green-600" />}
                  <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">{post.category}</span>
                </div>
                <h3 className="text-2xl font-bold text-stone-900 mb-4 line-clamp-2 leading-snug group-hover:text-red-700 transition">
                  {post.title}
                </h3>
                <p className="text-stone-600 mb-8 line-clamp-3 leading-relaxed text-sm">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-stone-100 mt-auto">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-400"><User size={14}/></div>
                    <span className="text-sm font-semibold text-stone-500">{post.author}</span>
                  </div>
                  <span className="text-xs text-stone-400">{new Date(post.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-stone-200">
            <Leaf size={48} className="mx-auto text-stone-200 mb-4" />
            <p className="text-stone-500 font-bold text-xl">New insights coming soon to this category!</p>
          </div>
        )}
      </div>
    </div>
  );
};
