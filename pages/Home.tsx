
import React from 'react';
import { useCMS } from '../store';
import { CheckCircle, Truck, ShieldCheck, Award, ArrowRight, HeartPulse, Brain, Zap } from 'lucide-react';
import { handleNavigate } from '../components/Layout';

export const Home = () => {
  const { state } = useCMS();
  const featuredProducts = state.products.filter(p => p.isFeatured);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&q=80&w=2000"
            alt="Spices Background"
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center md:text-left">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            {state.siteConfig.brandName} <br />
            <span className="text-amber-400">{state.siteConfig.tagline}</span>
          </h1>
          <p className="text-xl text-stone-200 max-w-2xl mb-10">
            Handpicked raw whole spices and pure powdered masalas sourced directly from the finest farms in the Deccan plateau. Hygienically packed for the ultimate flavor.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a 
              href="#/products" 
              onClick={(e) => handleNavigate(e, '#/products')}
              className="bg-red-700 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-red-800 transition shadow-lg flex items-center justify-center gap-2"
            >
              Browse Our Spices <ArrowRight size={20} />
            </a>
            <a 
              href="#/b2b" 
              onClick={(e) => handleNavigate(e, '#/b2b')}
              className="bg-white text-stone-900 px-8 py-4 rounded-full text-lg font-bold hover:bg-stone-100 transition shadow-lg"
            >
              B2B / Distributor Query
            </a>
          </div>
        </div>
      </section>

      {/* Science of Spices - Interactive Health Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-[3rem] p-12 shadow-sm border border-stone-100">
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl font-bold text-stone-900 mb-4">The Science of Spices</h2>
              <p className="text-stone-500">Ancient wisdom meets modern medicine. Learn how our pure spices contribute to your daily wellness.</p>
            </div>
            <a href="#/blog" onClick={(e) => handleNavigate(e, '#/blog')} className="text-red-700 font-bold flex items-center gap-2 hover:gap-4 transition-all">
              Visit Wellness Blog <ArrowRight size={20} />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-[2rem] bg-red-50 hover:bg-red-700 hover:text-white transition-all duration-500 cursor-pointer" onClick={(e) => { e.preventDefault(); window.location.hash = '#/blog'; }}>
              <HeartPulse size={40} className="text-red-700 group-hover:text-white mb-6 transition-colors" />
              <h4 className="text-xl font-bold mb-3">Anti-Inflammatory</h4>
              <p className="text-stone-600 group-hover:text-red-50 text-sm leading-relaxed">Turmeric and Black Pepper work together to reduce chronic inflammation naturally.</p>
            </div>
            <div className="group p-8 rounded-[2rem] bg-amber-50 hover:bg-amber-600 hover:text-white transition-all duration-500 cursor-pointer" onClick={(e) => { e.preventDefault(); window.location.hash = '#/blog'; }}>
              <Zap size={40} className="text-amber-600 group-hover:text-white mb-6 transition-colors" />
              <h4 className="text-xl font-bold mb-3">Metabolism Boost</h4>
              <p className="text-stone-600 group-hover:text-amber-50 text-sm leading-relaxed">Cumin seeds accelerate digestion and improve your body's nutrient absorption rate.</p>
            </div>
            <div className="group p-8 rounded-[2rem] bg-stone-100 hover:bg-stone-900 hover:text-white transition-all duration-500 cursor-pointer" onClick={(e) => { e.preventDefault(); window.location.hash = '#/blog'; }}>
              <Brain size={40} className="text-stone-700 group-hover:text-white mb-6 transition-colors" />
              <h4 className="text-xl font-bold mb-3">Cognitive Health</h4>
              <p className="text-stone-600 group-hover:text-stone-200 text-sm leading-relaxed">Antioxidants in whole spices protect your brain cells from daily oxidative stress.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Spices */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-stone-900 mb-4">Our Signature Selection</h2>
          <div className="h-1 w-20 bg-red-700 mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map(product => (
            <div key={product.id} className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300">
              <div className="h-64 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
              </div>
              <div className="p-6">
                <span className="text-xs font-bold text-red-700 uppercase tracking-widest">{product.type}</span>
                <h3 className="text-xl font-bold text-stone-900 mt-2 mb-3">{product.name}</h3>
                <p className="text-stone-600 text-sm mb-6 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {product.sizes.map(s => <span key={s} className="px-2 py-1 bg-stone-100 text-[10px] font-semibold text-stone-500 rounded">{s}</span>)}
                  </div>
                  <a 
                    href={`#/products`} 
                    onClick={(e) => handleNavigate(e, '#/products')}
                    className="text-red-700 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    Details <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-stone-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-stone-900 mb-6">Why Deccan Tadka Stands Out?</h2>
              <p className="text-stone-600 mb-10 text-lg leading-relaxed">
                For over three decades, we have been the silent strength behind millions of Indian kitchens. Our commitment to purity is non-negotiable.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-red-100 p-3 rounded-lg text-red-700"><CheckCircle /></div>
                  <div>
                    <h4 className="font-bold text-stone-900">100% Raw & Pure</h4>
                    <p className="text-sm text-stone-500">No fillers, no colors, no adulteration. Just pure spice.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-amber-100 p-3 rounded-lg text-amber-700"><ShieldCheck /></div>
                  <div>
                    <h4 className="font-bold text-stone-900">Hygienic Cold Grinding</h4>
                    <p className="text-sm text-stone-500">Slow grinding tech to keep oils and aroma intact.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-lg text-green-700"><Truck /></div>
                  <div>
                    <h4 className="font-bold text-stone-900">Direct Sourcing</h4>
                    <p className="text-sm text-stone-500">Sourced from selected farms in Andhra, Telangana, and beyond.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&q=80&w=1000" className="rounded-3xl shadow-2xl" alt="Spices quality" />
              <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-2xl shadow-xl hidden lg:block">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-red-700 text-white p-4 rounded-full"><Award size={32} /></div>
                  <div>
                    <p className="text-3xl font-bold text-stone-900">30+</p>
                    <p className="text-stone-500 font-medium">Years of Trust</p>
                  </div>
                </div>
                <p className="text-sm text-stone-400 italic">Certified Food Safety Standards</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* B2B CTA */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="spice-gradient p-12 md:p-20 rounded-[3rem] text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Powering HORECA & Retail</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto opacity-90 font-light">
            We supply bulk packs to hotels, caterers, and wholesalers across South India. Get special pricing for institutional orders.
          </p>
          <a 
            href="#/b2b" 
            onClick={(e) => handleNavigate(e, '#/b2b')}
            className="inline-block bg-stone-900 text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-stone-800 transition-transform hover:scale-105"
          >
            Become a Partner / Distributor
          </a>
        </div>
      </section>
    </div>
  );
};
