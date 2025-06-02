import React from 'react';
import { Facebook, Instagram, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-premium-onyx-900 border-t border-premium-gold-500/20 relative">
      {/* Premium texture overlay */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5"></div>

      {/* Luxury top border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-premium-gold-500 to-transparent"></div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Premium Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-premium-gold-500 to-premium-gold-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-premium-onyx-900 font-bold text-xl">🌊</span>
              </div>
              <h3 className="text-2xl font-playfair font-bold">
                <span className="bg-gradient-to-r from-premium-gold-400 to-premium-gold-500 bg-clip-text text-transparent">
                  Krivetka.am
                </span>
              </h3>
            </div>
            <p className="text-premium-pearl-300 mb-6 leading-relaxed">
              Your trusted source for premium seafood products, delivered with excellence and the finest attention to detail.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-3 bg-premium-onyx-800/50 border border-premium-gold-500/20 rounded-full text-premium-pearl-300 hover:text-premium-gold-400 hover:border-premium-gold-500/40 transition-all duration-300 backdrop-blur-sm">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 bg-premium-onyx-800/50 border border-premium-gold-500/20 rounded-full text-premium-pearl-300 hover:text-premium-gold-400 hover:border-premium-gold-500/40 transition-all duration-300 backdrop-blur-sm">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Premium Links */}
          <div>
            <h3 className="text-2xl font-playfair font-bold text-premium-gold-400 mb-6">Excellence</h3>
            <ul className="space-y-4">
              <li>
                <a href="#products" className="text-premium-pearl-300 hover:text-premium-gold-400 transition-colors duration-300 flex items-center gap-2 group">
                  <div className="w-2 h-2 bg-premium-gold-500/50 rounded-full group-hover:bg-premium-gold-400 transition-colors"></div>
                  Premium Collection
                </a>
              </li>
              <li>
                <a href="#about" className="text-premium-pearl-300 hover:text-premium-gold-400 transition-colors duration-300 flex items-center gap-2 group">
                  <div className="w-2 h-2 bg-premium-gold-500/50 rounded-full group-hover:bg-premium-gold-400 transition-colors"></div>
                  Our Story
                </a>
              </li>
              <li>
                <a href="#contact" className="text-premium-pearl-300 hover:text-premium-gold-400 transition-colors duration-300 flex items-center gap-2 group">
                  <div className="w-2 h-2 bg-premium-gold-500/50 rounded-full group-hover:bg-premium-gold-400 transition-colors"></div>
                  Luxury Service
                </a>
              </li>
            </ul>
          </div>

          {/* Premium Contact */}
          <div>
            <h3 className="text-2xl font-playfair font-bold text-premium-gold-400 mb-6">Concierge</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="p-2 bg-premium-gold-500/20 rounded-full">
                  <Phone className="w-4 h-4 text-premium-gold-400" />
                </div>
                <span className="text-premium-pearl-300">+374 94616939</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="p-2 bg-premium-emerald-500/20 rounded-full">
                  <span className="text-premium-emerald-400 text-sm font-bold">24/7</span>
                </div>
                <span className="text-premium-pearl-300">Always at your service</span>
              </li>
            </ul>

            {/* Premium badge */}
            <div className="mt-8 p-4 bg-gradient-to-r from-premium-gold-500/10 to-premium-gold-600/10 border border-premium-gold-500/20 rounded-xl">
              <p className="text-premium-gold-400 text-sm font-medium">
                ✨ Premium Quality Guaranteed
              </p>
            </div>
          </div>
        </div>


      </div>
    </footer>
  );
};

export default Footer;
