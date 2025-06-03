import { useRef, useEffect, useCallback } from 'react';
import { withMemo, DeferredRender } from '@/utils/componentOptimizer.jsx';
import { optimizeLayoutStyles, optimizeTextStyles, addScrollOptimizationClasses } from '@/utils/styleOptimizer.jsx';
import { Link } from '@inertiajs/react';
import { useCart } from '@/contexts/CartContext.jsx';
import { ShoppingCart } from 'lucide-react';

const MainLayout = ({ children }) => {
    const headerRef = useRef(null);
    const navRef = useRef(null);
    const cartCountRef = useRef(null);
    const mainRef = useRef(null);
    const { cartItems } = useCart();

    const applyOptimizations = useCallback(() => {
        // Apply global scroll optimizations only once
        addScrollOptimizationClasses();

        // Apply component-specific optimizations
        if (headerRef.current) {
            optimizeLayoutStyles(headerRef.current);
        }
        if (navRef.current) {
            optimizeLayoutStyles(navRef.current);
        }
        if (cartCountRef.current) {
            optimizeTextStyles(cartCountRef.current);
        }
        if (mainRef.current) {
            optimizeLayoutStyles(mainRef.current);
        }
    }, []);

    useEffect(() => {
        applyOptimizations();
    }, [applyOptimizations]);

    const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="min-h-screen bg-gray-50 optimized-scroll">
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
                                className="relative text-gray-600 hover:text-premium-gold-500 transition-colors duration-300"
                            >
                                <ShoppingCart className="w-6 h-6" />
                                {cartItemsCount > 0 && (
                                    <span
                                        ref={cartCountRef}
                                        className="absolute -top-2 -right-2 bg-premium-gold-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                    >
                                        {cartItemsCount}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>

            <main ref={mainRef} className="container mx-auto px-4 py-8">
                <DeferredRender priority="high">
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