import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { useCart } from "@/contexts/CartContext.jsx";

const ProductCard = ({ product }) => {
    const { addToCart, cartItems, updateQuantity, removeFromCart } = useCart();
    const [showQuantity, setShowQuantity] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const cartItem = cartItems.find(item => item.id === product.id);

    // Ensure we have valid image URLs and add console logging for debugging
    const images = product.images?.filter(img => img) || [];
    console.log('Product images:', images); // Debug log
    const currentImage = images[currentImageIndex] || '/images/placeholder.jpg';
    console.log('Current image:', currentImage); // Debug log

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!cartItem) {
            addToCart({ ...product, quantity: 1 });
            setShowQuantity(true);
        }
    };

    const handleQuantityChange = (e, newQuantity) => {
        e.preventDefault();
        e.stopPropagation();
        if (newQuantity < 1) {
            removeFromCart(product.id);
            setShowQuantity(false);
        } else {
            updateQuantity(product.id, newQuantity);
        }
    };

    const handleImageNavigation = (e, direction) => {
        e.preventDefault();
        e.stopPropagation();
        if (direction === 'next') {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        } else {
            setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
        }
    };

    return (
        <Link
            href={`/product/${product.id}`}
            className="w-full group relative bg-gradient-to-br from-premium-onyx-700/50 to-premium-onyx-800/50 rounded-xl overflow-hidden border border-premium-gold-500/10 hover:border-premium-gold-500/30 transition-all duration-300 cursor-pointer"
        >
            {/* Premium decorative elements */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-premium-gold-500/50 to-transparent"></div>

            {/* Image container with premium overlay */}
            <div className="relative aspect-square overflow-hidden">
                <img
                    src={currentImage}
                    alt={product.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                        console.error('Image failed to load:', currentImage); // Debug log
                        e.target.onerror = null;
                        e.target.src = '/images/placeholder.jpg';
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-premium-onyx-800/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Image Navigation */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={(e) => handleImageNavigation(e, 'prev')}
                            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-premium-onyx-900/80 text-premium-gold-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-premium-onyx-900"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={(e) => handleImageNavigation(e, 'next')}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-premium-onyx-900/80 text-premium-gold-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-premium-onyx-900"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                            {images.map((_, index) => (
                                <div
                                    key={index}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentImageIndex
                                        ? 'bg-premium-gold-400 w-4'
                                        : 'bg-premium-gold-400/50'
                                        }`}
                                />
                            ))}
                        </div>
                    </>
                )}

                {/* Add to Cart Button or Quantity Selector */}
                <div className={`absolute bottom-4 right-4 ${cartItem ? 'opacity-100' : 'opacity-100 sm:opacity-0 sm:group-hover:opacity-100'} transform translate-y-0 sm:translate-y-4 sm:group-hover:translate-y-0 transition-all duration-300`}>
                    {!showQuantity && !cartItem ? (
                        <button
                            onClick={handleAddToCart}
                            className="p-2.5 bg-premium-gold-500 text-premium-onyx-900 rounded-full hover:bg-premium-gold-600 transition-colors shadow-lg"
                        >
                            <ShoppingCart className="w-6 h-6" />
                        </button>
                    ) : (
                        <div className="flex items-center gap-2 bg-premium-onyx-900/90 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg">
                            <button
                                onClick={(e) => handleQuantityChange(e, (cartItem?.quantity || 1) - 1)}
                                className="p-1.5 rounded-full bg-premium-gold-500/20 hover:bg-premium-gold-500/30 text-premium-gold-400 transition-colors"
                            >
                                <Minus className="w-5 h-5" />
                            </button>
                            <span className="text-premium-pearl-50 font-medium min-w-[24px] text-center text-lg">
                                {cartItem?.quantity || 1}
                            </span>
                            <button
                                onClick={(e) => handleQuantityChange(e, (cartItem?.quantity || 1) + 1)}
                                className="p-1.5 rounded-full bg-premium-gold-500/20 hover:bg-premium-gold-500/30 text-premium-gold-400 transition-colors"
                            >
                                <Plus className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Content with premium styling */}
            <div className="p-6 sm:p-8">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl sm:text-lg font-playfair font-bold text-premium-pearl-50 group-hover:text-premium-gold-400 transition-colors">
                        {product.title}
                    </h3>
                    <div className="flex flex-col items-end">
                        {product.discount > 0 ? (
                            <>
                                <span className="text-xl sm:text-lg text-premium-gold-400 font-bold">${product.price}</span>
                                <span className="text-base sm:text-sm text-premium-pearl-400 line-through">${product.price}</span>
                            </>
                        ) : (
                            <span className="text-xl sm:text-lg text-premium-gold-400 font-bold">${product.price}</span>
                        )}
                    </div>
                </div>

                <p className="text-base sm:text-sm text-premium-pearl-300 mb-4 line-clamp-2">
                    {product.description}
                </p>

                <div className="flex justify-end">
                    <span className="text-base sm:text-sm text-premium-pearl-400">{product.stock} in stock</span>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
