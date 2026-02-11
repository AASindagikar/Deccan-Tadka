
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
  Phone,
  Eye
} from 'lucide-react';
import { Product, BlogPost, Enquiry } from '../types';

export const AdminDashboard = () => {
  const { state, updateProducts, updateBlogs, updateSiteConfig, updateEnquiryStatus, deleteEnquiry } = useCMS();
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'blogs' | 'enquiries' | 'settings'>('overview');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
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

  const saveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;
    const newList = editingBlog.id === 'new'
      ? [...state.blogs, { ...editingBlog, id: 'b' + Date.now(), date: new Date().toISOString() }]
      : state.blogs.map(b => b.id === editingBlog.id ? editingBlog : b);
    updateBlogs(newList);
    setEditingBlog(null);
  };

  const deleteBlog = (id: string) => {
    if (confirm('Delete this article?')) {
      updateBlogs(state.blogs.filter(b => b.id !== id));
    }
  };

  const saveSettings = () => {
    updateSiteConfig(settingsForm);
    alert('Settings saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-64 bg-stone-900 text-white flex flex-col fixed h-full">
        <div className="p-6 border-b border-stone-800">
          <h1 className="text-xl font-bold brand-font">CMS Admin</h1>
          <p className="text-stone-500 text-xs">Deccan Tadka Spices</p>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${activeTab === 'overview' ? 'bg-red-700' : 'hover:bg-stone-800'}`}><LayoutDashboard size={20} /> Dashboard</button>
          <button onClick={() => setActiveTab('enquiries')} className={`w-full flex items-center justify-between p-3 rounded-lg transition ${activeTab === 'enquiries' ? 'bg-red-700' : 'hover:bg-stone-800'}`}><div className="flex items-center gap-3"><MessageSquare size={20} /> Enquiries</div>{state.enquiries.filter(e => e.status === 'New').length > 0 && <span className="bg-white text-red-700 px-2 py-0.5 rounded-full text-xs font-bold">{state.enquiries.filter(e => e.status === 'New').length}</span>}</button>
          <button onClick={() => setActiveTab('products')} className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${activeTab === 'products' ? 'bg-red-700' : 'hover:bg-stone-800'}`}><Package size={20} /> Products</button>
          <button onClick={() => setActiveTab('blogs')} className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${activeTab === 'blogs' ? 'bg-red-700' : 'hover:bg-stone-800'}`}><FileText size={20} /> Blog Engine</button>
          <button onClick={() => setActiveTab('settings')} className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${activeTab === 'settings' ? 'bg-red-700' : 'hover:bg-stone-800'}`}><Settings size={20} /> Settings</button>
        </nav>
        <div className="p-4 border-t border-stone-800"><button onClick={handleExit} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-stone-800 text-stone-400 transition-colors"><LogOut size={20} /> Exit Admin</button></div>
      </aside>

      <main className="ml-64 flex-grow p-10 overflow-auto">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-800">Operational Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Leads', val: state.enquiries.length, icon: <MessageSquare />, color: 'red' },
                { label: 'Articles', val: state.blogs.length, icon: <FileText />, color: 'amber' },
                { label: 'Inventory', val: state.products.length, icon: <Package />, color: 'blue' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                  <div className={`text-${stat.color}-600 mb-2`}>{stat.icon}</div>
                  <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.val}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'blogs' && !editingBlog && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-800">Blog Engine</h2>
              <button 
                onClick={() => setEditingBlog({ id: 'new', title: '', slug: '', excerpt: '', content: '', image: '', date: '', author: 'Admin', category: 'Health', status: 'Draft' })}
                className="bg-amber-600 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2"
              >
                <Plus size={20} /> Write Article
              </button>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50"><tr><th className="px-6 py-4">Title</th><th className="px-6 py-4">Category</th><th className="px-6 py-4">Status</th><th className="px-6 py-4 text-right">Actions</th></tr></thead>
                <tbody className="divide-y divide-gray-100">
                  {state.blogs.map(post => (
                    <tr key={post.id}>
                      <td className="px-6 py-4"><span className="font-bold">{post.title}</span></td>
                      <td className="px-6 py-4"><span className="px-2 py-1 bg-gray-100 rounded text-xs uppercase font-bold">{post.category}</span></td>
                      <td className="px-6 py-4"><span className={`px-2 py-1 rounded text-xs font-bold ${post.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{post.status}</span></td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button onClick={() => setEditingBlog(post)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit3 size={18} /></button>
                        <button onClick={() => deleteBlog(post.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'blogs' && editingBlog && (
          <div className="max-w-5xl bg-white p-10 rounded-3xl shadow-xl">
             <h3 className="text-2xl font-bold mb-8">Article Editor</h3>
             <form onSubmit={saveBlog} className="space-y-6">
               <div className="grid grid-cols-2 gap-6">
                 <div>
                   <label className="block text-sm font-bold mb-2">Title</label>
                   <input required type="text" className="w-full p-3 border rounded-xl" value={editingBlog.title} onChange={e => setEditingBlog({...editingBlog, title: e.target.value})} />
                 </div>
                 <div>
                   <label className="block text-sm font-bold mb-2">Category</label>
                   <select className="w-full p-3 border rounded-xl" value={editingBlog.category} onChange={e => setEditingBlog({...editingBlog, category: e.target.value})}>
                     <option>Health</option><option>Wellness</option><option>Culinary</option><option>Heritage</option>
                   </select>
                 </div>
               </div>
               <div>
                 <label className="block text-sm font-bold mb-2">Excerpt</label>
                 <textarea className="w-full p-3 border rounded-xl h-20" value={editingBlog.excerpt} onChange={e => setEditingBlog({...editingBlog, excerpt: e.target.value})} />
               </div>
               <div>
                 <label className="block text-sm font-bold mb-2">Full Content</label>
                 <textarea className="w-full p-3 border rounded-xl h-64" value={editingBlog.content} onChange={e => setEditingBlog({...editingBlog, content: e.target.value})} />
               </div>
               <div className="flex gap-4">
                 <div className="flex-grow">
                   <label className="block text-sm font-bold mb-2">Image URL</label>
                   <input type="text" className="w-full p-3 border rounded-xl" value={editingBlog.image} onChange={e => setEditingBlog({...editingBlog, image: e.target.value})} />
                 </div>
                 <div>
                   <label className="block text-sm font-bold mb-2">Status</label>
                   <select className="p-3 border rounded-xl" value={editingBlog.status} onChange={e => setEditingBlog({...editingBlog, status: e.target.value as any})}>
                     <option value="Draft">Draft</option><option value="Published">Published</option>
                   </select>
                 </div>
               </div>
               <div className="pt-6 border-t flex gap-4">
                 <button type="submit" className="bg-red-700 text-white px-10 py-3 rounded-xl font-bold">Save Article</button>
                 <button type="button" onClick={() => setEditingBlog(null)} className="text-gray-500 font-bold">Cancel</button>
               </div>
             </form>
          </div>
        )}

        {/* Keeping Products/Enquiries/Settings logic intact... */}
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
            </div>
          </div>
        )}
        
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
                  <tr><th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase">Product</th><th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase">Type</th><th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase text-right">Actions</th></tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {state.products.map(product => (
                    <tr key={product.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4"><div className="flex items-center gap-3"><img src={product.image} className="w-10 h-10 rounded-lg object-cover" /><span className="font-bold text-gray-800">{product.name}</span></div></td>
                      <td className="px-6 py-4"><span className={`px-3 py-1 rounded-full text-xs font-bold ${product.type === 'Whole' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>{product.type}</span></td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button onClick={() => setEditingProduct(product)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit3 size={18} /></button>
                        <button onClick={() => { if(confirm('Delete product?')) updateProducts(state.products.filter(p => p.id !== product.id)) }} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-4xl space-y-8">
            <h2 className="text-3xl font-bold text-gray-800">Global Site Settings</h2>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 space-y-6">
              <h3 className="text-xl font-bold text-gray-800 border-b pb-4">Branding & Colors</h3>
              <div className="grid grid-cols-2 gap-6">
                <div><label className="block text-sm font-bold mb-2">Brand Name</label><input type="text" className="w-full p-3 border rounded-xl" value={settingsForm.brandName} onChange={e => setSettingsForm({...settingsForm, brandName: e.target.value})} /></div>
                <div><label className="block text-sm font-bold mb-2">Tagline</label><input type="text" className="w-full p-3 border rounded-xl" value={settingsForm.tagline} onChange={e => setSettingsForm({...settingsForm, tagline: e.target.value})} /></div>
              </div>
            </div>
            <div className="flex justify-end"><button onClick={saveSettings} className="bg-stone-900 text-white px-10 py-4 rounded-xl font-bold hover:bg-stone-800 transition shadow-lg">Apply All Changes</button></div>
          </div>
        )}
      </main>
    </div>
  );
};
