import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    darkMode: ["class"],

    prefix: "",
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: {
            colors: {
                'ocean-blue': {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    200: '#bae6fd',
                    300: '#7dd3fc',
                    400: '#38bdf8',
                    500: '#0ea5e9',
                    600: '#0284c7',
                    700: '#0369a1',
                    800: '#075985',
                    900: '#0c4a6e',
                    950: '#082f49',
                },
                'golden': {
                    50: '#fffbeb',
                    100: '#fef3c7',
                    200: '#fde68a',
                    300: '#fcd34d',
                    400: '#fbbf24',
                    500: '#f59e0b',
                    600: '#d97706',
                    700: '#b45309',
                    800: '#92400e',
                    900: '#78350f',
                    950: '#451a03',
                },
                'premium': {
                    'navy': '#1a2b3c',
                    'cream': '#faf6f1',
                    'copper': '#b87333',
                    'ivory': '#fffff0',
                    'charcoal': '#36454f',
                    'gold': {
                        50: '#fdf8e3',
                        100: '#f9f0c3',
                        200: '#f2e18c',
                        300: '#e6c84d',
                        400: '#d9b02c',
                        500: '#c49a1f',
                        600: '#a37b1a',
                        700: '#825e1a',
                        800: '#6b4c1a',
                        900: '#5a4019',
                    },
                    'platinum': {
                        50: '#f8f9fa',
                        100: '#f1f3f5',
                        200: '#e9ecef',
                        300: '#dee2e6',
                        400: '#ced4da',
                        500: '#adb5bd',
                        600: '#6c757d',
                        700: '#495057',
                        800: '#343a40',
                        900: '#212529',
                    },
                    'emerald': {
                        50: '#ecfdf5',
                        100: '#d1fae5',
                        200: '#a7f3d0',
                        300: '#6ee7b7',
                        400: '#34d399',
                        500: '#10b981',
                        600: '#059669',
                        700: '#047857',
                        800: '#065f46',
                        900: '#064e3b',
                    },
                    'ruby': {
                        50: '#fef2f2',
                        100: '#fee2e2',
                        200: '#fecaca',
                        300: '#fca5a5',
                        400: '#f87171',
                        500: '#ef4444',
                        600: '#dc2626',
                        700: '#b91c1c',
                        800: '#991b1b',
                        900: '#7f1d1d',
                    },
                    'sapphire': {
                        50: '#eff6ff',
                        100: '#dbeafe',
                        200: '#bfdbfe',
                        300: '#93c5fd',
                        400: '#60a5fa',
                        500: '#3b82f6',
                        600: '#2563eb',
                        700: '#1d4ed8',
                        800: '#1e40af',
                        900: '#1e3a8a',
                    },
                    'pearl': {
                        50: '#fafafa',
                        100: '#f5f5f5',
                        200: '#e5e5e5',
                        300: '#d4d4d4',
                        400: '#a3a3a3',
                        500: '#737373',
                        600: '#525252',
                        700: '#404040',
                        800: '#262626',
                        900: '#171717',
                    },
                    'onyx': {
                        50: '#f8fafc',
                        100: '#f1f5f9',
                        200: '#e2e8f0',
                        300: '#cbd5e1',
                        400: '#94a3b8',
                        500: '#64748b',
                        600: '#475569',
                        700: '#334155',
                        800: '#1e293b',
                        900: '#0f172a',
                    },
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },
                'premium-onyx': {
                    50: '#f8f9fa',
                    100: '#f1f3f5',
                    200: '#e9ecef',
                    300: '#dee2e6',
                    400: '#ced4da',
                    500: '#adb5bd',
                    600: '#6c757d',
                    700: '#495057',
                    800: '#343a40',
                    900: '#212529',
                },
                'premium-sapphire': {
                    50: '#e7f5ff',
                    100: '#d0ebff',
                    200: '#a5d8ff',
                    300: '#74c0fc',
                    400: '#4dabf7',
                    500: '#339af0',
                    600: '#228be6',
                    700: '#1c7ed6',
                    800: '#1971c2',
                    900: '#1864ab',
                },
                'premium-gold': {
                    50: '#fdf8e3',
                    100: '#fbf1c7',
                    200: '#f7e8a3',
                    300: '#f4df7f',
                    400: '#f0d65b',
                    500: '#eccd37',
                    600: '#d9b921',
                    700: '#b69a1b',
                    800: '#937b15',
                    900: '#5a4019',
                },
                'premium-pearl': {
                    50: '#ffffff',
                    100: '#f8f9fa',
                    200: '#e9ecef',
                    300: '#dee2e6',
                    400: '#ced4da',
                    500: '#adb5bd',
                    600: '#6c757d',
                    700: '#495057',
                    800: '#343a40',
                    900: '#212529',
                },
                'premium-ruby': {
                    50: '#fff5f5',
                    100: '#ffe3e3',
                    200: '#ffc9c9',
                    300: '#ffa8a8',
                    400: '#ff8787',
                    500: '#ff6b6b',
                    600: '#fa5252',
                    700: '#f03e3e',
                    800: '#e03131',
                    900: '#c92a2a',
                },
            },
            fontFamily: {
                'playfair': ['Playfair Display', 'serif'],
                'inter': ['Inter', 'sans-serif'],
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            keyframes: {
                'float': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                'fade-in': {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'fade-in': 'fadeIn 0.5s ease-out'
            }
        }
    },

    plugins: [forms],
};
