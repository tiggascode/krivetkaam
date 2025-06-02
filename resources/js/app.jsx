import '../css/app.css';
import './bootstrap';
import { lazy, Suspense } from 'react';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext.jsx";

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Loading component for suspense fallback
const LoadingSpinner = () => (
    <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-premium-gold-500"></div>
    </div>
);

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const page = resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        );
        return page;
    },
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
    },
});
