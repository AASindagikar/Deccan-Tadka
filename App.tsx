
import React, { useEffect, useState } from 'react';
import { CMSProvider, useCMS } from './store';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { B2B } from './pages/B2B';
import { Blog } from './pages/Blog';
import { AdminDashboard } from './admin/Dashboard';
import { CheckCircle } from 'lucide-react';

const Router = () => {
  const [route, setRoute] = useState(window.location.hash || '#/');
  const { addEnquiry } = useCMS();

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash || '#/');
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const About = () => (
    <div className="py-20 max-w-4xl mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8 text-stone-900 brand-font">Our Heritage</h1>
      <div className="h-[400px] w-full rounded-[3rem] overflow-hidden mb-12 shadow-2xl border border-stone-200">
        <img src="https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&q=80&w=1200" alt="Deccan Spice" className="w-full h-full object-cover"/>
      </div>
      <div className="prose prose-lg text-stone-600 space-y-8">
        <p className="text-2xl font-medium text-stone-800 leading-relaxed italic border-l-4 border-red-700 pl-6">"Deccan Tadka is not just a brand; it's a movement to bring the purity of our soil to every Indian kitchen."</p>
        <p className="text-lg">We capture the true essence of Indian cuisine through meticulous sourcing. Every spice seed is hand-inspected before it enters our hygienic cold-grinding chambers.</p>
        <p className="text-lg">By sourcing directly from generational farmers in the Deccan Plateau, we ensure that the profits stay with the growers and the pure flavor reaches the consumers.</p>
      </div>
    </div>
  );

  const Contact = () => {
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      addEnquiry({ type: 'General', name: form.name, email: form.email, phone: 'See Email', message: form.message });
      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
    };

    return (
      <div className="py-20 max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16">
        <div>
          <h1 className="text-4xl font-bold mb-6 brand-font">Get in Touch</h1>
          <p className="text-stone-500 mb-10 text-lg">Drop us a message for general queries or distribution partnerships.</p>
          {submitted ? (
            <div className="bg-green-50 border border-green-100 p-8 rounded-3xl text-center">
              <CheckCircle size={48} className="text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-green-800">Message Received!</h3>
              <p className="text-green-600">We will respond via email shortly.</p>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input required placeholder="Your Name" className="w-full p-4 rounded-xl border border-stone-200 outline-none focus:ring-2 focus:ring-red-700" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                <input required type="email" placeholder="Email" className="w-full p-4 rounded-xl border border-stone-200 outline-none focus:ring-2 focus:ring-red-700" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
              </div>
              <textarea required placeholder="How can we help?" className="w-full p-4 rounded-xl border border-stone-200 outline-none h-40 focus:ring-2 focus:ring-red-700" value={form.message} onChange={e => setForm({...form, message: e.target.value})}></textarea>
              <button className="bg-red-700 text-white px-10 py-4 rounded-xl font-bold hover:bg-red-800 transition w-full shadow-lg">Send Message</button>
            </form>
          )}
        </div>
        <div className="bg-stone-100 rounded-[2.5rem] overflow-hidden min-h-[400px] shadow-inner">
          <iframe title="Map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.7577035118744!2d78.4354228!3d17.4124971!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb973273e9791f%3A0x28022a101b0f77e6!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1620822601000!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0, filter: 'grayscale(100%) contrast(120%)' }} allowFullScreen loading="lazy"></iframe>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (route.startsWith('#/admin')) return <AdminDashboard />;
    return (
      <Layout>
        {route === '#/' && <Home />}
        {route === '#/products' && <Products />}
        {route === '#/about' && <About />}
        {route === '#/b2b' && <B2B />}
        {route === '#/blog' && <Blog />}
        {route === '#/contact' && <Contact />}
      </Layout>
    );
  };

  return <>{renderContent()}</>;
};

const App: React.FC = () => {
  return (
    <CMSProvider>
      <Router />
    </CMSProvider>
  );
};

export default App;
