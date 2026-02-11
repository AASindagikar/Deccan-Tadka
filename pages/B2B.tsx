
import React, { useState } from 'react';
import { useCMS } from '../store';
import { Building2, UtensilsCrossed, Store, CheckCircle2, FileText, Send, CheckCircle } from 'lucide-react';

export const B2B = () => {
  const { addEnquiry } = useCMS();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    type: 'Distributor',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEnquiry({
      type: 'B2B',
      name: formData.name,
      email: '', // Optional for B2B
      phone: formData.phone,
      message: `Business Type: ${formData.type}. Requirements: ${formData.message}`
    });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', phone: '', type: 'Distributor', message: '' });
  };

  return (
    <div className="pb-20">
      <section className="bg-red-800 py-24 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Bulk Supply & Distribution</h1>
        <p className="text-xl opacity-90 max-w-3xl mx-auto font-light leading-relaxed">
          Specialized spice solutions for the HORECA industry, wholesalers, and food manufacturers.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-4 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <UtensilsCrossed />, title: 'Hotels & Caterers', desc: 'Custom bulk packing and consistent flavor profiles.' },
            { icon: <Store />, title: 'Retail Wholesalers', desc: 'Competitive margins and reliable logistics for networks.' },
            { icon: <Building2 />, title: 'Food Manufacturers', desc: 'Raw whole spices with certificate of analysis (COA).' },
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl shadow-xl">
              <div className="text-red-700 mb-6">{item.icon}</div>
              <h3 className="text-2xl font-bold text-stone-900 mb-4">{item.title}</h3>
              <p className="text-stone-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <section className="max-w-5xl mx-auto px-4 mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold mb-8">Why Partner With Us?</h2>
            <div className="space-y-6">
              {[
                'GST Invoicing for all bulk orders',
                'NABL Lab tested batches',
                'Doorstep delivery via trusted logistics',
                'Transparent pricing with no middlemen'
              ].map(text => (
                <div key={text} className="flex items-center gap-3 text-stone-700">
                  <CheckCircle2 className="text-green-600 flex-shrink-0" size={20} />
                  <span className="font-medium">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-stone-50 p-8 rounded-3xl border border-stone-200">
            {submitted ? (
              <div className="text-center py-10">
                <CheckCircle size={60} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-stone-900 mb-2">Enquiry Sent!</h3>
                <p className="text-stone-600">Our sales team will contact you within 24 hours.</p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <FileText className="text-red-700" /> B2B Enquiry Form
                </h3>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-bold text-stone-700 mb-2">Business Name</label>
                    <input 
                      required
                      type="text" 
                      className="w-full p-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-red-700 outline-none" 
                      placeholder="e.g. Spice Hub Pvt Ltd" 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-stone-700 mb-2">Phone Number</label>
                      <input 
                        required
                        type="tel" 
                        className="w-full p-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-red-700 outline-none" 
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-stone-700 mb-2">Type</label>
                      <select 
                        className="w-full p-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-red-700 outline-none"
                        value={formData.type}
                        onChange={e => setFormData({...formData, type: e.target.value})}
                      >
                        <option>Distributor</option>
                        <option>Hotel/Caterer</option>
                        <option>Retailer</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-stone-700 mb-2">Requirement Details</label>
                    <textarea 
                      required
                      className="w-full p-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-red-700 outline-none h-32" 
                      placeholder="e.g. Need 500kg Whole Jeera monthly..."
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                  </div>
                  <button type="submit" className="w-full py-4 bg-red-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-800 transition">
                    Send Enquiry <Send size={18} />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
