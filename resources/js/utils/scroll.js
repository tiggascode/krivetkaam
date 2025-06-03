/**
 * Smoothly scrolls to a target element
 * @param {string|HTMLElement} target - The target element or its ID
 * @param {Object} options - Scroll options
 * @param {number} options.duration - Duration of the scroll animation in milliseconds
 * @param {number} options.offset - Additional offset from the top of the viewport
 * @param {string} options.easing - Easing function for the animation
 */
export const smoothScrollTo = (target, options = {}) => {
    const {
        duration = 800,
        offset = 0,
        easing = 'easeInOutCubic'
    } = options;

    // Get the target element
    const element = typeof target === 'string' ? document.getElementById(target) : target;
    if (!element) return;

    // Get the target position
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    // Easing functions
    const easingFunctions = {
        linear: t => t,
        easeInQuad: t => t * t,
        easeOutQuad: t => t * (2 - t),
        easeInOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
        easeInCubic: t => t * t * t,
        easeOutCubic: t => (--t) * t * t + 1,
        easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
    };

    // Animation function
    const animation = currentTime => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easingFunctions[easing] || easingFunctions.easeInOutCubic;
        const run = ease(progress);

        window.scrollTo(0, startPosition + distance * run);

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    };

    // Start the animation
    requestAnimationFrame(animation);
};

/**
 * Scrolls to the top of the page smoothly
 * @param {Object} options - Scroll options
 */
export const scrollToTop = (options = {}) => {
    smoothScrollTo(document.documentElement, { ...options, offset: 0 });
}; 