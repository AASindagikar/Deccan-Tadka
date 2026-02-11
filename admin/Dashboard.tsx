
import React, { useState } from 'react';
import { useCMS } from '../store';
import { 
  LayoutDashboard, 
  Package, 
  FileText, 
  Settings, 
  LogOut, 
  Plus, 
  Edit3, 
  Trash2, 
  Save, 
  Image as ImageIcon,
  Check,
  MessageSquare,
  Clock,
  User,
  Phone
} from 'lucide-react';
import { Product, BlogPost, Enquiry } from '../types';

export const AdminDashboard = () => {
  const { state, updateProducts, updateBlogs, updateSiteConfig, updateEnquiryStatus, deleteEnquiry } = useCMS();
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'blogs' | 'enquiries' | 'settings'>('overview');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [settingsForm, setSettingsForm] = useState(state.siteConfig);

  const handleExit = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.hash = '#/';
  };

  const saveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    const newList = editingProduct.id === 'new' 
      ? [...state.products, { ...editingProduct, id: Date.now().toString() }]
      : state.products.map(p => p.id === editingProduct.id ? editingProduct : p);
    updateProducts(newList);
    setEditingProduct(null);
  };

  const deleteProduct = (id: string) => {
    if (confirm('Delete this product?')) {
      updateProducts(state.products.filter(p => p.id !== id));
    }
  };

  const saveSettings = () => {
    updateSiteConfig(settingsForm);
    alert('Settings saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-stone-900 text-white flex flex-col fixed h-full">
        <div className="p-6 border-b border-stone-800">
          <h1 className="text-xl font-bold brand-font">CMS Admin</h1>
          <p className="text-stone-500 text-xs">Deccan Tadka Spices</p>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${activeTab === 'overview' ? 'bg-red-700' : 'hover:bg-stone-800'}`}
          >
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('enquiries')}
            className={`w-full flex items-center justify-between p-3 rounded-lg transition ${activeTab === 'enquiries' ? 'bg-red-700' : 'hover:bg-stone-800'}`}
          >
            <div className="flex items-center gap-3"><MessageSquare size={20} /> Enquiries</div>
            {state.enquiries.filter(e => e.status === 'New').length > 0 && (
              <span className="bg-white text-red-700 px-2 py-0.5 rounded-full text-xs font-bold">
                {state.enquiries.filter(e => e.status === 'New').length}
              </span>
            )}
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${activeTab === 'products' ? 'bg-red-700' : 'hover:bg-stone-800'}`}
          >
            <Package size={20} /> Products
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${activeTab === 'settings' ? 'bg-red-700' : 'hover:bg-stone-800'}`}
          >
            <Settings size={20} /> Site Settings
          </button>
        </nav>
        <div className="p-4 border-t border-stone-800">
          <button 
            onClick={handleExit}
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-stone-800 text-stone-400 transition-colors"
          >
            <LogOut size={20} /> Exit Admin
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-grow p-10 overflow-auto">
        
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-800">Welcome Back, Admin</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Enquiries', val: state.enquiries.length, icon: <MessageSquare />, color: 'red' },
                { label: 'Total Products', val: state.products.length, icon: <Package />, color: 'blue' },
                { label: 'New Leads', val: state.enquiries.filter(e => e.status === 'New').length, icon: <Clock />, color: 'green' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                  <div className={`text-${stat.color}-600 mb-2`}>{stat.icon}</div>
                  <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.val}</p>
                </div>
              ))}
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-6">Recent Sales Enquiries</h3>
              <div className="space-y-4">
                {state.enquiries.slice(0, 5).map(enq => (
                  <div key={enq.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="bg-stone-200 p-2 rounded-lg"><User size={20} /></div>
                      <div>
                        <p className="font-bold text-sm">{enq.name}</p>
                        <p className="text-xs text-gray-500">{enq.type} Enquiry • {new Date(enq.timestamp).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <button onClick={() => setActiveTab('enquiries')} className="text-red-700 text-xs font-bold hover:underline">View Details</button>
                  </div>
                ))}
                {state.enquiries.length === 0 && <p className="text-gray-400 italic">No enquiries yet.</p>}
              </div>
            </div>
          </div>
        )}

        {/* Enquiries Tab */}
        {activeTab === 'enquiries' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">Business Enquiries & Leads</h2>
            <div className="grid grid-cols-1 gap-4">
              {state.enquiries.map(enq => (
                <div key={enq.id} className={`bg-white p-6 rounded-2xl shadow-sm border ${enq.status === 'New' ? 'border-red-200' : 'border-gray-200'}`}>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${enq.type === 'B2B' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                          {enq.type}
                        </span>
                        <h4 className="text-lg font-bold text-gray-900">{enq.name}</h4>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1"><Phone size={14}/> {enq.phone}</span>
                        <span className="flex items-center gap-1"><Clock size={14}/> {new Date(enq.timestamp).toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <select 
                        className="text-xs border rounded p-1"
                        value={enq.status}
                        onChange={(e) => updateEnquiryStatus(enq.id, e.target.value as any)}
                      >
                        <option value="New">New</option>
                        <option value="Read">Mark as Read</option>
                        <option value="Contacted">Contacted</option>
                      </select>
                      <button onClick={() => deleteEnquiry(enq.id)} className="p-1 text-red-400 hover:text-red-600"><Trash2 size={16}/></button>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl text-stone-700 text-sm whitespace-pre-wrap italic">
                    "{enq.message}"
                  </div>
                </div>
              ))}
              {state.enquiries.length === 0 && (
                <div className="text-center py-20 bg-white rounded-3xl">
                  <MessageSquare size={48} className="mx-auto text-gray-200 mb-4" />
                  <p className="text-gray-500 font-bold">No leads yet. They will appear here when customers fill out forms.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && !editingProduct && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-800">Manage Products</h2>
              <button 
                onClick={() => setEditingProduct({ id: 'new', name: '', type: 'Whole', description: '', sizes: [], image: '', category: '', isFeatured: false })}
                className="bg-red-700 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2"
              >
                <Plus size={20} /> Add New Spice
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase">Product</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase">Type</th>
                    <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {state.products.map(product => (
                    <tr key={product.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={product.image} className="w-10 h-10 rounded-lg object-cover" />
                          <span className="font-bold text-gray-800">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${product.type === 'Whole' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                          {product.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button onClick={() => setEditingProduct(product)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit3 size={18} /></button>
                        <button onClick={() => deleteProduct(product.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Product Editor */}
        {activeTab === 'products' && editingProduct && (
          <div className="max-w-4xl bg-white p-10 rounded-3xl shadow-xl border border-gray-200">
            <h3 className="text-2xl font-bold mb-8">{editingProduct.id === 'new' ? 'New Spice' : 'Edit Spice'}</h3>
            <form onSubmit={saveProduct} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Product Name</label>
                  <input 
                    required
                    type="text" 
                    className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-700 outline-none" 
                    value={editingProduct.name}
                    onChange={e => setEditingProduct({...editingProduct, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Type</label>
                  <select 
                    className="w-full p-3 rounded-xl border border-gray-200 outline-none"
                    value={editingProduct.type}
                    onChange={e => setEditingProduct({...editingProduct, type: e.target.value as any})}
                  >
                    <option value="Whole">Whole</option>
                    <option value="Powdered">Powdered</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                <textarea 
                  className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-700 outline-none h-32"
                  value={editingProduct.description}
                  onChange={e => setEditingProduct({...editingProduct, description: e.target.value})}
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Image URL</label>
                <div className="flex gap-4">
                  <input 
                    type="text" 
                    className="flex-grow p-3 rounded-xl border border-gray-200 outline-none"
                    value={editingProduct.image}
                    onChange={e => setEditingProduct({...editingProduct, image: e.target.value})}
                  />
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden border border-gray-200">
                    {editingProduct.image ? <img src={editingProduct.image} className="w-full h-full object-cover" /> : <ImageIcon size={20} className="text-gray-400" />}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 py-4 border-t border-gray-100">
                <button type="submit" className="bg-red-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2">
                  <Save size={20} /> Save Product
                </button>
                <button type="button" onClick={() => setEditingProduct(null)} className="text-gray-500 font-bold px-4">Cancel</button>
              </div>
            </form>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="max-w-4xl space-y-8">
            <h2 className="text-3xl font-bold text-gray-800">Global Site Settings</h2>
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 space-y-6">
              <h3 className="text-xl font-bold text-gray-800 border-b pb-4">Branding & Colors</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Brand Name</label>
                  <input 
                    type="text" 
                    className="w-full p-3 rounded-xl border border-gray-200 outline-none" 
                    value={settingsForm.brandName}
                    onChange={e => setSettingsForm({...settingsForm, brandName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Tagline</label>
                  <input 
                    type="text" 
                    className="w-full p-3 rounded-xl border border-gray-200 outline-none" 
                    value={settingsForm.tagline}
                    onChange={e => setSettingsForm({...settingsForm, tagline: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button 
                onClick={saveSettings}
                className="bg-stone-900 text-white px-10 py-4 rounded-xl font-bold hover:bg-stone-800 transition shadow-lg"
              >
                Apply All Changes
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};
