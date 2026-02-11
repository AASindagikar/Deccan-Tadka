
import React, { useState } from 'react';
import { useCMS } from '../store';
import { Filter, Search, ShoppingBag, CheckCircle } from 'lucide-react';

export const Products = () => {
  const { state, addEnquiry } = useCMS();
  const [filter, setFilter] = useState<'All' | 'Whole' | 'Powdered'>('All');
  const [search, setSearch] = useState('');
  const [orderedId, setOrderedId] = useState<string | null>(null);

  const filteredProducts = state.products.filter(p => {
    const matchesType = filter === 'All' || p.type === filter;
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleOrderEnquiry = (productName: string, id: string) => {
    addEnquiry({
      type: 'Product',
      name: 'Interest Lead',
      email: '',
      phone: 'Follow-up Required',
      message: `User expressed interest in ordering: ${productName}`
    });
    setOrderedId(id);
    setTimeout(() => setOrderedId(null), 3000);
  };

  return (
    <div className="py-20 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-stone-900 mb-4">Our Spice Pantry</h1>
          <p className="text-stone-500 max-w-2xl text-lg">
            Explore our collection of pure, unadulterated spices.
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition group">
              <div className="relative h-64 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide text-white ${product.type === 'Whole' ? 'bg-amber-600' : 'bg-red-700'}`}>
                    {product.type}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-stone-900 mb-2">{product.name}</h3>
                <p className="text-stone-500 text-sm mb-6 h-10 line-clamp-2">{product.description}</p>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(s => (
                      <span key={s} className="px-3 py-1 bg-stone-100 text-[11px] font-bold text-stone-600 rounded-md border border-stone-200">
                        {s}
                      </span>
                    ))}
                  </div>
                  <button 
                    onClick={() => handleOrderEnquiry(product.name, product.id)}
                    className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition ${orderedId === product.id ? 'bg-green-600 text-white' : 'bg-stone-900 text-white hover:bg-red-700'}`}
                  >
                    {orderedId === product.id ? <><CheckCircle size={18} /> Lead Recorded</> : <><ShoppingBag size={18} /> Order Enquiry</>}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
