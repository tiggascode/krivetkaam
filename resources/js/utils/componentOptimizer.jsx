import React, { useCallback, useEffect, useRef, useState, useMemo } from 'react';

// Higher-order component for memoization with shallow comparison
export const withMemo = (Component) => {
    return React.memo(Component, (prevProps, nextProps) => {
        const prevKeys = Object.keys(prevProps);
        const nextKeys = Object.keys(nextProps);

        if (prevKeys.length !== nextKeys.length) return false;

        return prevKeys.every(key => {
            const prevValue = prevProps[key];
            const nextValue = nextProps[key];

            if (typeof prevValue === 'function' && typeof nextValue === 'function') {
                return prevValue.toString() === nextValue.toString();
            }

            return prevValue === nextValue;
        });
    });
};

// Virtualized list component for efficient rendering of large lists
export const VirtualizedList = ({ items, renderItem, itemHeight, containerHeight }) => {
    const [scrollTop, setScrollTop] = useState(0);
    const containerRef = useRef(null);
    const rafRef = useRef(null);

    const handleScroll = useCallback((e) => {
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
        }

        rafRef.current = requestAnimationFrame(() => {
            setScrollTop(e.target.scrollTop);
        });
    }, []);

    const visibleItems = useMemo(() => Math.ceil(containerHeight / itemHeight), [containerHeight, itemHeight]);
    const startIndex = useMemo(() => Math.floor(scrollTop / itemHeight), [scrollTop, itemHeight]);
    const endIndex = useMemo(() => Math.min(startIndex + visibleItems + 1, items.length), [startIndex, visibleItems, items.length]);
    const totalHeight = useMemo(() => items.length * itemHeight, [items.length, itemHeight]);
    const offsetY = useMemo(() => startIndex * itemHeight, [startIndex, itemHeight]);

    const visibleItemsList = useMemo(() =>
        items.slice(startIndex, endIndex).map((item, index) => (
            <div key={item.id || index} style={{ height: itemHeight }}>
                {renderItem(item)}
            </div>
        )),
        [items, startIndex, endIndex, itemHeight, renderItem]);

    useEffect(() => {
        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            style={{ height: containerHeight, overflow: 'auto' }}
            onScroll={handleScroll}
            className="premium-scrollbar"
        >
            <div style={{ height: totalHeight, position: 'relative' }}>
                <div style={{ transform: `translate3d(0,${offsetY}px,0)` }}>
                    {visibleItemsList}
                </div>
            </div>
        </div>
    );
};

// Infinite scroll component with debounced intersection observer
export const InfiniteScroll = ({ children, onLoadMore, hasMore }) => {
    const observerRef = useRef(null);
    const loadMoreRef = useRef(null);
    const timeoutRef = useRef(null);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '200px',
            threshold: 0.1,
        };

        observerRef.current = new IntersectionObserver((entries) => {
            const [entry] = entries;
            if (entry.isIntersecting && hasMore) {
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }
                timeoutRef.current = setTimeout(() => {
                    onLoadMore();
                }, 100);
            }
        }, options);

        if (loadMoreRef.current) {
            observerRef.current.observe(loadMoreRef.current);
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [hasMore, onLoadMore]);

    return (
        <>
            {children}
            <div ref={loadMoreRef} style={{ height: '20px' }} />
        </>
    );
};

// Deferred render component with priority
export const DeferredRender = ({ children, delay = 50, priority = 'low' }) => {
    const [shouldRender, setShouldRender] = useState(priority === 'high');

    useEffect(() => {
        if (priority === 'high') return;

        const timer = setTimeout(() => {
            setShouldRender(true);
        }, delay);

        return () => clearTimeout(timer);
    }, [delay, priority]);

    return shouldRender ? children : null;
};

// Hook for optimized memoization with shallow comparison
export const useOptimizedMemo = (callback, deps) => {
    return useMemo(callback, deps);
}; 