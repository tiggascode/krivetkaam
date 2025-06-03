import '../css/app.css';
import './bootstrap';
import { lazy, Suspense } from 'react';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext.jsx";

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Optimized loading component with reduced animation complexity
const LoadingSpinner = () => (
    <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-premium-gold-500"></div>
    </div>
);

// Implement code splitting for pages
const resolvePage = (name) => {
    const page = resolvePageComponent(
        `./Pages/${name}.jsx`,
        import.meta.glob('./Pages/**/*.jsx', { eager: false }),
    );
    return page;
};

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: resolvePage,
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <BrowserRouter>
                <Suspense fallback={<LoadingSpinner />}>
                    <CartProvider>
                        <App {...props} />
                    </CartProvider>
                </Suspense>
            </BrowserRouter>
        );
    },
    progress: {
        color: '#4B5563',
        showSpinner: false, // Disable spinner for better performance
    },
});
