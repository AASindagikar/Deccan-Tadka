
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CMSState, Product, BlogPost, SiteConfig, PageContent, Enquiry } from './types';

// Use environment variable or default to VM local IP for the API
const API_BASE = 'http://localhost:3001/api';

const INITIAL_STATE: CMSState = {
  products: [
    {
      id: '1',
      name: 'Whole Jeera (Cumin Seeds)',
      type: 'Whole',
      description: 'Hand-picked premium Cumin seeds from the heart of the Deccan region, known for their intense aroma and high essential oil content.',
      sizes: ['50g','100g', '200g', '500g', '1kg'],
      image: 'https://images.unsplash.com/photo-1593001872095-7d5b12877bc9?q=80&w=1000&auto=format&fit=crop',
      category: 'Whole Spices',
      isFeatured: true
    }
  ],
  blogs: [],
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
  // Added updateBlogs to ContextProps
  updateBlogs: (blogs: BlogPost[]) => void;
  updateSiteConfig: (config: SiteConfig) => void;
  addEnquiry: (enquiry: Omit<Enquiry, 'id' | 'timestamp' | 'status'>) => void;
  updateEnquiryStatus: (id: string, status: Enquiry['status']) => void;
  deleteEnquiry: (id: string) => void;
}

const CMSContext = createContext<ContextProps | undefined>(undefined);

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<CMSState>(INITIAL_STATE);

  // Load state from Backend on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_BASE}/state`);
        const data = await res.json();
        // Merge backend data with initial state to ensure structure
        setState(prev => ({
          ...prev,
          ...data,
          products: data.products?.length ? data.products : prev.products,
          siteConfig: data.siteConfig?.brandName ? data.siteConfig : prev.siteConfig
        }));
      } catch (e) {
        console.warn("Backend not reached, using LocalStorage fallback");
        const saved = localStorage.getItem('deccan_tadka_cms');
        if (saved) setState(JSON.parse(saved));
      }
    };
    fetchData();
  }, []);

  // Sync to local storage for offline support
  useEffect(() => {
    localStorage.setItem('deccan_tadka_cms', JSON.stringify(state));
    document.documentElement.style.setProperty('--spice-primary', state.siteConfig.primaryColor);
    document.documentElement.style.setProperty('--spice-secondary', state.siteConfig.secondaryColor);
  }, [state]);

  const updateProducts = async (products: Product[]) => {
    setState(prev => ({ ...prev, products }));
    try {
      await fetch(`${API_BASE}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(products)
      });
    } catch (e) {}
  };

  // Implemented updateBlogs
  const updateBlogs = async (blogs: BlogPost[]) => {
    setState(prev => ({ ...prev, blogs }));
    try {
      await fetch(`${API_BASE}/blogs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogs)
      });
    } catch (e) {}
  };

  const updateSiteConfig = async (siteConfig: SiteConfig) => {
    setState(prev => ({ ...prev, siteConfig }));
    try {
      await fetch(`${API_BASE}/config`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(siteConfig)
      });
    } catch (e) {}
  };
  
  const addEnquiry = async (enquiryData: Omit<Enquiry, 'id' | 'timestamp' | 'status'>) => {
    try {
      const res = await fetch(`${API_BASE}/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enquiryData)
      });
      const newEnq = await res.json();
      setState(prev => ({ ...prev, enquiries: [newEnq, ...prev.enquiries] }));
    } catch (e) {
      // Fallback if server is down
      const fallbackEnq: Enquiry = { ...enquiryData, id: Date.now().toString(), timestamp: new Date().toISOString(), status: 'New' };
      setState(prev => ({ ...prev, enquiries: [fallbackEnq, ...prev.enquiries] }));
    }
  };

  const updateEnquiryStatus = async (id: string, status: Enquiry['status']) => {
    setState(prev => ({
      ...prev,
      enquiries: prev.enquiries.map(e => e.id === id ? { ...e, status } : e)
    }));
    try {
      await fetch(`${API_BASE}/enquiries/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      });
    } catch (e) {}
  };

  const deleteEnquiry = (id: string) => {
    setState(prev => ({ ...prev, enquiries: prev.enquiries.filter(e => e.id !== id) }));
  };

  return (
    <CMSContext.Provider value={{ 
      state, 
      updateProducts, 
      updateBlogs, // Added updateBlogs to Provider
      updateSiteConfig, 
      addEnquiry,
      updateEnquiryStatus,
      deleteEnquiry
    }}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) throw new Error('useCMS must be used within CMSProvider');
  return context;
};
