import { useRef, useEffect } from 'react';
import { withMemo, DeferredRender } from '@/utils/componentOptimizer.jsx';
import { optimizeLayoutStyles, optimizeTextStyles } from '@/utils/styleOptimizer.jsx';
import { Link } from '@inertiajs/react';
import { useCart } from '@/contexts/CartContext.jsx';

const MainLayout = ({ children }) => {
    const headerRef = useRef(null);
    const navRef = useRef(null);
    const cartCountRef = useRef(null);
    const { cartItems } = useCart();

    useEffect(() => {
        if (headerRef.current) {
            optimizeLayoutStyles(headerRef.current);
        }
        if (navRef.current) {
            optimizeLayoutStyles(navRef.current);
        }
        if (cartCountRef.current) {
            optimizeTextStyles(cartCountRef.current);
        }
    }, []);

    const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="min-h-screen bg-gray-50">
            <header
                ref={headerRef}
                className="optimized-layout bg-white shadow-sm sticky top-0 z-50"
            >
                <nav
                    ref={navRef}
                    className="optimized-layout container mx-auto px-4 py-4"
                >
                    <div className="flex justify-between items-center">
                        <Link
                            href="/"
                            className="text-2xl font-bold text-premium-gold-500"
                        >
                            Fish Shop
                        </Link>

                        <div className="flex items-center space-x-6">
                            <Link
                                href="/products"
                                className="text-gray-600 hover:text-premium-gold-500 transition-colors duration-300"
                            >
                                Products
                            </Link>

                            <Link
                                href="/cart"
                                className="relative"
                            >
                                <span className="sr-only">Cart</span>
                                <svg
                                    className="w-6 h-6 text-gray-600 hover:text-premium-gold-500 transition-colors duration-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>

                                {cartItemsCount > 0 && (
                                    <span
                                        ref={cartCountRef}
                                        className="optimized-text absolute -top-2 -right-2 bg-premium-gold-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                                    >
                                        {cartItemsCount}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>

            <main className="container mx-auto px-4 py-8">
                <DeferredRender timeout={100}>
                    {children}
                </DeferredRender>
            </main>

            <footer className="bg-white border-t mt-auto">
                <div className="container mx-auto px-4 py-8">
                    <p className="text-center text-gray-600">
                        © {new Date().getFullYear()} Fish Shop. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default withMemo(MainLayout); 