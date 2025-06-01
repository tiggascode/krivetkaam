import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-premium-onyx-900 border-t border-premium-gold-500/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-playfair font-bold text-premium-pearl-50 mb-4">Krivetka.am</h3>
            <p className="text-premium-pearl-300 mb-4">
              Your trusted source for premium seafood products, delivered with excellence and care.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-premium-pearl-300 hover:text-premium-gold-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-premium-pearl-300 hover:text-premium-gold-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-playfair font-bold text-premium-pearl-50 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#products" className="text-premium-pearl-300 hover:text-premium-gold-400 transition-colors">
                  Products
                </a>
              </li>
              <li>
                <a href="#about" className="text-premium-pearl-300 hover:text-premium-gold-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="text-premium-pearl-300 hover:text-premium-gold-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-playfair font-bold text-premium-pearl-50 mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="text-premium-pearl-300">
                Phone: +374 94616939
              </li>

            </ul>
          </div>
        </div>

        {/* Bottom Bar */}

      </div>
    </footer>
  );
};

export default Footer;
