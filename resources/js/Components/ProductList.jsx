import { useRef, useEffect } from 'react';
import { withMemo } from '@/utils/componentOptimizer';
import { VirtualizedList, InfiniteScroll } from '@/utils/componentOptimizer';
import { optimizeScrollStyles } from '@/utils/styleOptimizer';
import ProductCard from './ProductCard';

const ProductList = ({ products, onLoadMore, hasMore }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            optimizeScrollStyles(containerRef.current);
        }
    }, []);

    const renderProduct = (product) => (
        <ProductCard key={product.id} product={product} />
    );

    return (
        <div ref={containerRef} className="optimized-scroll">
            <InfiniteScroll onLoadMore={onLoadMore} hasMore={hasMore}>
                <VirtualizedList
                    items={products}
                    renderItem={renderProduct}
                    itemHeight={400} // Adjust based on your ProductCard height
                    containerHeight={800} // Adjust based on your viewport
                />
            </InfiniteScroll>
        </div>
    );
};

export default withMemo(ProductList); 