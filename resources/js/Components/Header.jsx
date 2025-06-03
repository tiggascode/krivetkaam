import React, { useState, useCallback, useMemo, memo } from 'react';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from "@/contexts/CartContext.jsx";
import { Link } from '@inertiajs/react';

const Header = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItems } = useCart();

  const scrollToSection = useCallback((sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = section.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: offset,
        behavior: 'smooth',
        duration: 500 // Faster duration
      });
      setIsMenuOpen(false);
    }
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const totalItems = useMemo(() => getTotalItems(), [getTotalItems]);

  return (
    <header className="bg-premium-onyx-800/95 backdrop-blur-md shadow-xl z-50 border-b border-premium-gold-500/20 -mt-[1px]">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between relative">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-premium-gold-500 to-premium-gold-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-premium-onyx-900 font-bold text-xl">🌊</span>
            </div>
            <Link href="/" className="text-2xl font-playfair font-bold text-premium-pearl-50 tracking-wide">
              Krivetka<span className="text-premium-gold-400">.am</span>
            </Link>
          </div>

          {/* Navigation (Desktop) */}
          <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-8">
              <button
                onClick={() => scrollToSection('products')}
                className="text-premium-pearl-200 hover:text-premium-gold-400 transition-colors"
              >
                Products
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-premium-pearl-200 hover:text-premium-gold-400 transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-premium-pearl-200 hover:text-premium-gold-400 transition-colors"
              >
                Contact
              </button>
            </div>
          </nav>

          {/* Mobile Menu Button and Cart */}
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <button
              className="md:hidden text-premium-pearl-50"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Cart */}
            <div>
              <Link
                href="/cart"
                className="relative p-2 bg-premium-gold-500 text-premium-onyx-900 rounded-full hover:bg-premium-gold-600 transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center justify-center"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-premium-onyx-900 text-premium-gold-400 text-xs rounded-full w-5 h-5 flex items-center justify-center border border-premium-gold-500/20">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-premium-gold-500/20">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection('products')}
                className="text-premium-pearl-200 hover:text-premium-gold-400 transition-colors text-left"
              >
                Products
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-premium-pearl-200 hover:text-premium-gold-400 transition-colors text-left"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-premium-pearl-200 hover:text-premium-gold-400 transition-colors text-left"
              >
                Contact
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;

