import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { useCart } from "@/contexts/CartContext.jsx";

const ProductCard = ({ product }) => {
    const { addToCart, cartItems, updateQuantity, removeFromCart } = useCart();
    const [showQuantity, setShowQuantity] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
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
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative bg-gradient-to-br from-premium-onyx-800/60 to-premium-onyx-900/80 rounded-2xl overflow-hidden border border-premium-gold-500/20 hover:border-premium-gold-500/50 transition-all duration-500 cursor-pointer backdrop-blur-md shadow-2xl hover:shadow-premium-gold-500/20"
        >
            {/* Premium texture overlay */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5"></div>

            {/* Luxury top border */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-premium-gold-500 to-transparent opacity-60"></div>

            {/* Premium corner accents */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-premium-gold-500/30"></div>
            <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-premium-gold-500/30"></div>

            {/* Image container with luxury overlay */}
            <div className="relative aspect-square overflow-hidden">
                <img
                    src={currentImage}
                    alt={product.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                        console.error('Image failed to load:', currentImage);
                        e.target.onerror = null;
                        e.target.src = '/images/placeholder.jpg';
                    }}
                />

                {/* Premium gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-premium-onyx-900/90 via-transparent to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-60'}`}></div>

                {/* Luxury shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-premium-gold-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

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

                {/* Premium badges */}
                <div className="absolute top-6 left-6 flex flex-col gap-3">
                    {product.isNew && (
                        <span className="px-4 py-2 bg-gradient-to-r from-premium-gold-500 to-premium-gold-600 text-premium-onyx-900 text-sm font-bold rounded-full shadow-lg">
                            ✨ New Arrival
                        </span>
                    )}
                    {product.discount > 0 && (
                        <span className="px-4 py-2 bg-gradient-to-r from-premium-ruby-500 to-premium-ruby-600 text-premium-pearl-50 text-sm font-bold rounded-full shadow-lg">
                            🔥 -{product.discount}% OFF
                        </span>
                    )}
                </div>

                {/* Premium add to cart section */}
                <div className={`absolute bottom-6 right-6 ${cartItem ? 'opacity-100' : 'opacity-100 sm:opacity-0 sm:group-hover:opacity-100'} transform translate-y-0 sm:translate-y-4 sm:group-hover:translate-y-0 transition-all duration-300`}>
                    {!showQuantity && !cartItem ? (
                        <button
                            onClick={handleAddToCart}
                            className="group/btn relative p-4 bg-gradient-to-r from-premium-gold-500 to-premium-gold-600 text-premium-onyx-900 rounded-full hover:from-premium-gold-600 hover:to-premium-gold-700 transition-all duration-300 transform hover:scale-110 shadow-2xl ring-4 ring-premium-gold-500/20 hover:ring-premium-gold-500/40"
                        >
                            <ShoppingCart className="w-6 h-6" />
                            <div className="absolute inset-0 bg-gradient-to-r from-premium-gold-600 to-premium-gold-700 rounded-full opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                        </button>
                    ) : (
                        <div className="flex items-center gap-3 bg-premium-onyx-900/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-2xl border border-premium-gold-500/30">
                            <button
                                onClick={(e) => handleQuantityChange(e, (cartItem?.quantity || 1) - 1)}
                                className="p-2 rounded-full bg-gradient-to-r from-premium-gold-500/20 to-premium-gold-600/20 hover:from-premium-gold-500/40 hover:to-premium-gold-600/40 text-premium-gold-400 transition-all duration-300 border border-premium-gold-500/30"
                            >
                                <Minus className="w-5 h-5" />
                            </button>
                            <span className="text-premium-pearl-50 font-bold min-w-[28px] text-center text-lg">
                                {cartItem?.quantity || 1}
                            </span>
                            <button
                                onClick={(e) => handleQuantityChange(e, (cartItem?.quantity || 1) + 1)}
                                className="p-2 rounded-full bg-gradient-to-r from-premium-gold-500/20 to-premium-gold-600/20 hover:from-premium-gold-500/40 hover:to-premium-gold-600/40 text-premium-gold-400 transition-all duration-300 border border-premium-gold-500/30"
                            >
                                <Plus className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Premium content section */}
            <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                    <h3 className="text-2xl font-playfair font-bold text-premium-pearl-50 group-hover:text-premium-gold-400 transition-colors duration-300">
                        {product.title}
                    </h3>
                    <div className="flex flex-col items-end">
                        {product.discount > 0 ? (
                            <>
                                <span className="text-2xl font-bold bg-gradient-to-r from-premium-gold-400 to-premium-gold-500 bg-clip-text text-transparent">
                                    ${product.price}
                                </span>
                                <span className="text-premium-pearl-400 line-through text-lg">
                                    ${(product.price * (1 + product.discount / 100))}
                                </span>
                            </>
                        ) : (
                            <span className="text-2xl font-bold bg-gradient-to-r from-premium-gold-400 to-premium-gold-500 bg-clip-text text-transparent">
                                ${product.price}
                            </span>
                        )}
                    </div>
                </div>

                <p className="text-premium-pearl-300 mb-6 line-clamp-2 leading-relaxed">
                    {product.description}
                </p>

                {/* Premium details */}
                <div className="flex justify-between items-center pt-4 border-t border-premium-gold-500/20">
                    <span className="text-premium-pearl-400 text-sm font-medium">
                        {product.stock} in stock
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
