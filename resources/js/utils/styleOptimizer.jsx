// Optimize scroll styles for better performance
export const optimizeScrollStyles = (element) => {
    if (!element) return;

    // Use a single transform for better performance
    element.style.transform = 'translate3d(0,0,0)';
    element.style.willChange = 'transform';

    // Only apply these if not already set
    if (!element.style.backfaceVisibility) {
        element.style.backfaceVisibility = 'hidden';
    }
    if (!element.style.perspective) {
        element.style.perspective = '1000px';
    }
};

// Optimize layout styles for better performance
export const optimizeLayoutStyles = (element) => {
    if (!element) return;

    // Use a single transform for better performance
    element.style.transform = 'translate3d(0,0,0)';
    element.style.willChange = 'transform';

    // Only apply these if not already set
    if (!element.style.backfaceVisibility) {
        element.style.backfaceVisibility = 'hidden';
    }
    if (!element.style.perspective) {
        element.style.perspective = '1000px';
    }
};

// Optimize text styles for better performance
export const optimizeTextStyles = (element) => {
    if (!element) return;

    // Only apply these if not already set
    if (!element.style.textRendering) {
        element.style.textRendering = 'optimizeSpeed';
    }
    if (!element.style.webkitFontSmoothing) {
        element.style.webkitFontSmoothing = 'antialiased';
    }
};

// Add CSS classes for scroll optimization
export const addScrollOptimizationClasses = () => {
    const style = document.createElement('style');
    style.textContent = `
        .optimized-scroll {
            -webkit-overflow-scrolling: touch;
            overscroll-behavior: contain;
            transform: translate3d(0,0,0);
            will-change: transform;
        }

        .optimized-scroll * {
            transform: translate3d(0,0,0);
            will-change: transform;
        }

        /* Optimize images and videos */
        .optimized-scroll img,
        .optimized-scroll video {
            content-visibility: auto;
            contain: size layout;
        }

        /* Optimize text rendering */
        .optimized-scroll {
            text-rendering: optimizeSpeed;
            -webkit-font-smoothing: antialiased;
        }

        /* Optimize animations */
        .optimized-scroll * {
            transition: transform 0.1s linear;
        }

        /* Optimize paint operations */
        .optimized-scroll {
            contain: content;
        }
    `;
    document.head.appendChild(style);
}; 