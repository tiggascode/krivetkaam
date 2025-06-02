import React, { useState, useCallback, useMemo, memo } from 'react';
import { ShoppingCart, Menu, X, Search } from 'lucide-react';
import { useCart } from "@/contexts/CartContext.jsx";
import debounce from 'lodash/debounce';

const Header = memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { getTotalItems } = useCart();

  const scrollToSection = useCallback((sectionId) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  }, []);

  const debouncedSearch = useMemo(
    () =>
      debounce((query) => {
        // Implement your search logic here
        console.log('Searching for:', query);
      }, 300),
    []
  );

  const handleSearchChange = useCallback((e) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  }, [debouncedSearch]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const totalItems = useMemo(() => getTotalItems(), [getTotalItems]);

  return (
    <header className="bg-premium-onyx-800/95 backdrop-blur-md shadow-xl sticky top-0 z-50 border-b border-premium-gold-500/20 -mt-[1px]">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-premium-gold-500 to-premium-gold-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-premium-onyx-900 font-bold text-xl">🌊</span>
            </div>
            <a href="/" className="text-2xl font-playfair font-bold text-premium-pearl-50 tracking-wide">
              Krivetka<span className="text-premium-gold-400">.am</span>
            </a>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
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
          </nav>

          {/* Search and Cart */}
          <div className="flex items-center space-x-6">
            <div className="relative hidden md:block">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search..."
                className="bg-premium-onyx-800/50 border border-premium-gold-500/20 rounded-full px-4 py-2 text-premium-pearl-50 placeholder-premium-pearl-300/50 focus:outline-none focus:border-premium-gold-500/50 w-48"
              />
              <Search className="w-4 h-4 text-premium-pearl-300/50 absolute right-4 top-1/2 transform -translate-y-1/2" />
            </div>

            <a
              href="/cart"
              className="relative p-2 bg-premium-gold-500 text-premium-onyx-900 rounded-full hover:bg-premium-gold-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-premium-onyx-900 text-premium-gold-400 text-xs rounded-full w-5 h-5 flex items-center justify-center border border-premium-gold-500/20">
                  {totalItems}
                </span>
              )}
            </a>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-premium-pearl-50"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
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

