
import React, { useState } from 'react';
import { useCMS } from '../store';
import { Filter, Search, ShoppingBag, CheckCircle, X, Send } from 'lucide-react';
import { Product } from '../types';

export const Products = () => {
  const { state, addEnquiry } = useCMS();
  const [filter, setFilter] = useState<'All' | 'Whole' | 'Powdered'>('All');
  const [search, setSearch] = useState('');
  const [activeEnquiry, setActiveEnquiry] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });

  const filteredProducts = state.products.filter(p => {
    const matchesType = filter === 'All' || p.type === filter;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleSubmitEnquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeEnquiry) return;

    setIsSubmitting(true);
    try {
      await addEnquiry({
        type: 'Product',
        name: formData.name,
        email: 'N/A',
        phone: formData.phone,
        message: `Inquiry for: ${activeEnquiry.name}. Comments: ${formData.message}`,
        productName: activeEnquiry.name
      });
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setActiveEnquiry(null);
        setFormData({ name: '', phone: '', message: '' });
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=1000';

  return (
    <div className="py-20 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-stone-900 mb-4">Our Spice Pantry</h1>
          <p className="text-stone-500 max-w-2xl text-lg">
            Explore our collection of pure, unadulterated spices. Sourced directly, packed hygienically.
          </p>
        </header>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
          <div className="flex bg-white p-1 rounded-xl shadow-sm border border-stone-200">
            {['All', 'Whole', 'Powdered'].map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t as any)}
                className={`px-6 py-2 rounded-lg text-sm font-bold transition ${filter === t ? 'bg-red-700 text-white shadow-md' : 'text-stone-500 hover:text-stone-900'}`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
            <input
              type="text"
              placeholder="Search spices..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-red-700 transition"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition duration-500 group">
              <div className="relative h-72 overflow-hidden bg-stone-100">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
                  }}
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-white shadow-lg ${product.type === 'Whole' ? 'bg-amber-600' : 'bg-red-700'}`}>
                    {product.type}
                  </span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-stone-900 mb-3 group-hover:text-red-700 transition-colors">{product.name}</h3>
                <p className="text-stone-500 text-sm mb-8 leading-relaxed line-clamp-2">{product.description}</p>
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(s => (
                      <span key={s} className="px-3 py-1 bg-stone-50 text-[11px] font-bold text-stone-600 rounded-lg border border-stone-200 uppercase tracking-tighter">
                        {s}
                      </span>
                    ))}
                  </div>
                  <button 
                    onClick={() => setActiveEnquiry(product)}
                    className="w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 bg-stone-900 text-white hover:bg-red-700 shadow-lg shadow-stone-200"
                  >
                    <ShoppingBag size={20} /> Order Enquiry
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lead Capture Modal */}
        {activeEnquiry && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-stone-900/80 backdrop-blur-sm">
            <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
              <div className="relative h-32 bg-red-700 p-8 text-white flex items-end justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Inquiry for</h4>
                  <h3 className="text-2xl font-bold brand-font">{activeEnquiry.name}</h3>
                </div>
                <button 
                  onClick={() => setActiveEnquiry(null)}
                  className="absolute top-6 right-6 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-8">
                {isSuccess ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                      <CheckCircle size={40} />
                    </div>
                    <h3 className="text-2xl font-bold text-stone-900 mb-2">Request Received!</h3>
                    <p className="text-stone-500">Our team will call you back on your mobile shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitEnquiry} className="space-y-5">
                    <div>
                      <label className="block text-sm font-bold text-stone-700 mb-2">Your Name</label>
                      <input 
                        required
                        type="text"
                        placeholder="Enter full name"
                        className="w-full p-4 rounded-xl border border-stone-200 outline-none focus:ring-2 focus:ring-red-700 transition-all"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-stone-700 mb-2">Mobile Number</label>
                      <input 
                        required
                        type="tel"
                        placeholder="e.g. +91 98765 43210"
                        className="w-full p-4 rounded-xl border border-stone-200 outline-none focus:ring-2 focus:ring-red-700 transition-all"
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-stone-700 mb-2">Comments / Quantity</label>
                      <textarea 
                        required
                        placeholder="Tell us about your requirement..."
                        className="w-full p-4 rounded-xl border border-stone-200 outline-none focus:ring-2 focus:ring-red-700 transition-all h-28 resize-none"
                        value={formData.message}
                        onChange={e => setFormData({...formData, message: e.target.value})}
                      ></textarea>
                    </div>
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full py-5 bg-red-700 text-white rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-red-800 transition-all shadow-xl shadow-red-100 disabled:opacity-50"
                    >
                      {isSubmitting ? 'Sending...' : <><Send size={20} /> Submit Inquiry</>}
                    </button>
                    <p className="text-center text-xs text-stone-400">By submitting, you agree to receive a call back from Deccan Tadka.</p>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="text-center py-32 bg-white rounded-[3rem] border-2 border-dashed border-stone-200">
            <Search size={48} className="mx-auto text-stone-200 mb-4" />
            <h3 className="text-2xl font-bold text-stone-900 mb-2">No Spices Found</h3>
            <p className="text-stone-500">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
};
