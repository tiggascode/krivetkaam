import React from 'react';
import ProductCard from "@/Components/ProductCard.jsx";

const ProductGrid = ({products}) => {

    return (
        <section className="py-8 sm:py-12 px-1 sm:px-4">
            <div className="w-full sm:container sm:mx-auto sm:max-w-[1400px]">
                <div className="text-center mb-6 sm:mb-8">

                    <p className="text-xl text-ocean-blue-100 max-w-2xl mx-auto">
                        Handpicked from the finest waters around the world, each product meets our exceptional standards for freshness and quality
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
                    {products.map((product, index) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductGrid;
