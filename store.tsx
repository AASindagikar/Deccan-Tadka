
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CMSState, Product, BlogPost, SiteConfig, PageContent, Enquiry } from './types';

const API_BASE = 'http://localhost:3001/api';

const INITIAL_STATE: CMSState = {
  products: [
    {
      id: '1',
      name: 'Curcuma Longa (Premium Turmeric)',
      type: 'Powdered',
      description: 'High-curcumin turmeric sourced from the Sangli region. Known for its deep orange hue and potent anti-inflammatory properties.',
      sizes: ['100g', '200g', '500g'],
      image: 'https://images.unsplash.com/photo-1615485500704-8e990fdd904f?auto=format&fit=crop&q=80&w=1000',
      category: 'Ground Spices',
      isFeatured: true
    },
    {
      id: '2',
      name: 'Shahi Jeera (Caraway Seeds)',
      type: 'Whole',
      description: 'Earthy, nutty, and essential for digestion. Our Shahi Jeera is double-cleaned and retains maximum essential oils.',
      sizes: ['50g', '100g'],
      image: 'https://images.unsplash.com/photo-1593001872095-7d5b12877bc9?auto=format&fit=crop&q=80&w=1000',
      category: 'Whole Spices',
      isFeatured: true
    }
  ],
  blogs: [
    {
      id: 'b1',
      title: 'The Golden Healer: Why Turmeric is your Immunity Best Friend',
      slug: 'turmeric-health-benefits',
      excerpt: 'Discover why modern science is finally catching up to the ancient wisdom of Curcumin for inflammation and immunity.',
      content: 'Turmeric contains Curcumin, a substance with powerful anti-inflammatory and antioxidant properties. Most studies use turmeric extracts that are specialized to contain large amounts of curcumin. Adding a pinch of black pepper to your turmeric dishes can increase absorption by 2000%!',
      image: 'https://images.unsplash.com/photo-1585241930032-a0031ae4f36c?auto=format&fit=crop&q=80&w=1000',
      date: new Date().toISOString(),
      author: 'Dr. Spice',
      category: 'Health',
      status: 'Published'
    },
    {
      id: 'b2',
      title: 'Cumin: The Secret to a Happy Gut',
      slug: 'cumin-digestion-benefits',
      excerpt: 'From bloating relief to metabolism boosting, Cumin (Jeera) is the unsung hero of the Indian spice box.',
      content: 'Cumin seeds contain naturally occurring substances that work as antioxidants. It helps in the secretion of digestive enzymes, which accelerates the digestion process. It is also a rich source of iron, making it essential for energy levels.',
      image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&q=80&w=1000',
      date: new Date().toISOString(),
      author: 'Deccan Kitchen',
      category: 'Wellness',
      status: 'Published'
    },
    {
      id: 'b3',
      title: 'Black Pepper: The "King of Spices" and Bioavailability',
      slug: 'black-pepper-benefits',
      excerpt: 'Did you know that Black Pepper helps you absorb nutrients from other foods? Learn about the power of Piperine.',
      content: 'Black pepper is more than just a kitchen staple. It contains piperine, which has been shown to improve memory and cognitive function in some studies. Most importantly, piperine significantly enhances the absorption of curcumin from turmeric.',
      image: 'https://images.unsplash.com/photo-1509358740172-f77c1ad89373?auto=format&fit=crop&q=80&w=1000',
      date: new Date().toISOString(),
      author: 'Ayu-Science',
      category: 'Health',
      status: 'Published'
    }
  ],
  enquiries: [],
  siteConfig: {
    brandName: 'Deccan Tadka',
    tagline: 'Pure Spices from the Heart of the Deccan',
    primaryColor: '#D32F2F',
    secondaryColor: '#FFC107',
    contactEmail: 'info@deccantadka.com',
    contactPhone: '+91 98765 43210',
    address: 'Plot No. 45, Industrial Estate, Hyderabad, Telangana, India - 500001',
    socials: { facebook: '#', instagram: '#', youtube: '#', whatsapp: '#' }
  },
  pages: []
};

interface ContextProps {
  state: CMSState;
  updateProducts: (products: Product[]) => void;
  updateBlogs: (blogs: BlogPost[]) => void;
  updateSiteConfig: (config: SiteConfig) => void;
  addEnquiry: (enquiry: Omit<Enquiry, 'id' | 'timestamp' | 'status'>) => void;
  updateEnquiryStatus: (id: string, status: Enquiry['status']) => void;
  deleteEnquiry: (id: string) => void;
}

const CMSContext = createContext<ContextProps | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<CMSState>(INITIAL_STATE);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_BASE}/state`);
        const data = await res.json();
        setState(prev => ({
          ...prev,
          ...data,
          products: data.products?.length ? data.products : prev.products,
          blogs: data.blogs?.length ? data.blogs : prev.blogs,
          siteConfig: data.siteConfig?.brandName ? data.siteConfig : prev.siteConfig
        }));
      } catch (e) {
        const saved = localStorage.getItem('deccan_tadka_cms');
        if (saved) setState(JSON.parse(saved));
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem('deccan_tadka_cms', JSON.stringify(state));
    document.documentElement.style.setProperty('--spice-primary', state.siteConfig.primaryColor);
    document.documentElement.style.setProperty('--spice-secondary', state.siteConfig.secondaryColor);
  }, [state]);

  const updateProducts = async (products: Product[]) => {
    setState(prev => ({ ...prev, products }));
    try { await fetch(`${API_BASE}/products`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(products) }); } catch (e) {}
  };

  const updateBlogs = async (blogs: BlogPost[]) => {
    setState(prev => ({ ...prev, blogs }));
    try { await fetch(`${API_BASE}/blogs`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(blogs) }); } catch (e) {}
  };

  const updateSiteConfig = async (siteConfig: SiteConfig) => {
    setState(prev => ({ ...prev, siteConfig }));
    try { await fetch(`${API_BASE}/config`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(siteConfig) }); } catch (e) {}
  };
  
  const addEnquiry = async (enquiryData: Omit<Enquiry, 'id' | 'timestamp' | 'status'>) => {
    try {
      const res = await fetch(`${API_BASE}/enquiries`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(enquiryData) });
      const newEnq = await res.json();
      setState(prev => ({ ...prev, enquiries: [newEnq, ...prev.enquiries] }));
    } catch (e) {
      const fallbackEnq: Enquiry = { ...enquiryData, id: Date.now().toString(), timestamp: new Date().toISOString(), status: 'New' };
      setState(prev => ({ ...prev, enquiries: [fallbackEnq, ...prev.enquiries] }));
    }
  };

  const updateEnquiryStatus = async (id: string, status: Enquiry['status']) => {
    setState(prev => ({ ...prev, enquiries: prev.enquiries.map(e => e.id === id ? { ...e, status } : e) }));
    try { await fetch(`${API_BASE}/enquiries/status`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, status }) }); } catch (e) {}
  };

  const deleteEnquiry = (id: string) => { setState(prev => ({ ...prev, enquiries: prev.enquiries.filter(e => e.id !== id) })); };

  return (
    <CMSContext.Provider value={{ state, updateProducts, updateBlogs, updateSiteConfig, addEnquiry, updateEnquiryStatus, deleteEnquiry }}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) throw new Error('useCMS must be used within CMSProvider');
  return context;
};
