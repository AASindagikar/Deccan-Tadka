
import React, { useState } from 'react';
import { useCMS } from '../store';
import { Menu, X, Facebook, Instagram, Youtube, Phone, Mail, MapPin } from 'lucide-react';

export const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
  e.preventDefault();
  window.location.hash = href;
};

export const Navbar = () => {
  const { state } = useCMS();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#/' },
    { name: 'Products', href: '#/products' },
    { name: 'About Us', href: '#/about' },
    { name: 'B2B/Bulk', href: '#/b2b' },
    { name: 'Blog', href: '#/blog' },
    { name: 'Contact', href: '#/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <a 
              href="#/" 
              onClick={(e) => handleNavigate(e, '#/')}
              className="flex-shrink-0 flex items-center"
            >
              <span className="text-2xl font-bold brand-font text-red-700">{state.siteConfig.brandName}</span>
            </a>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavigate(e, link.href)}
                className="text-gray-700 hover:text-red-700 font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#/admin"
              onClick={(e) => handleNavigate(e, '#/admin')}
              className="bg-amber-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-amber-600 transition-colors"
            >
              CMS Admin
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-red-700 hover:bg-gray-50"
                onClick={(e) => {
                  handleNavigate(e, link.href);
                  setIsOpen(false);
                }}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export const Footer = () => {
  const { state } = useCMS();
  const config = state.siteConfig;

  return (
    <footer className="bg-stone-900 text-stone-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <h3 className="text-2xl font-bold brand-font text-white mb-6">{config.brandName}</h3>
          <p className="text-stone-400 leading-relaxed mb-6">
            Providing the purest spices from the Deccan heartland since decades. We believe in authenticity, hygiene, and tradition.
          </p>
          <div className="flex space-x-4">
            <a href={config.socials.facebook} className="hover:text-amber-500 transition-colors"><Facebook size={20} /></a>
            <a href={config.socials.instagram} className="hover:text-amber-500 transition-colors"><Instagram size={20} /></a>
            <a href={config.socials.youtube} className="hover:text-amber-500 transition-colors"><Youtube size={20} /></a>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
          <ul className="space-y-4">
            <li><a href="#/products" onClick={(e) => handleNavigate(e, '#/products')} className="hover:text-amber-500">Our Spices</a></li>
            <li><a href="#/about" onClick={(e) => handleNavigate(e, '#/about')} className="hover:text-amber-500">Quality Standards</a></li>
            <li><a href="#/b2b" onClick={(e) => handleNavigate(e, '#/b2b')} className="hover:text-amber-500">B2B & Distribution</a></li>
            <li><a href="#/blog" onClick={(e) => handleNavigate(e, '#/blog')} className="hover:text-amber-500">Spice Guide</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-6">Contact Us</h4>
          <ul className="space-y-4">
            <li className="flex items-start space-x-3">
              <MapPin size={20} className="text-amber-500 flex-shrink-0" />
              <span>{config.address}</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone size={20} className="text-amber-500" />
              <span>{config.contactPhone}</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail size={20} className="text-amber-500" />
              <span>{config.contactEmail}</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold text-white mb-6">B2B Enquiry</h4>
          <p className="text-sm text-stone-400 mb-4">Are you a distributor or hotelier?</p>
          <a
            href={config.socials.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-full font-bold hover:bg-green-700 transition-colors text-center w-full"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-stone-800 text-center text-sm text-stone-500">
        © {new Date().getFullYear()} {config.brandName} (FMCG Div). All Rights Reserved.
      </div>
    </footer>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};
