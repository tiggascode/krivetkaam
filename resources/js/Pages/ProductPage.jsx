import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import Header from '../components/Header';

const ProductPage = ({ product }) => {
    const { addToCart, cartItems, updateQuantity, removeFromCart } = useCart();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [availableQuantity, setAvailableQuantity] = useState(product.quantity);

    // Ensure we have valid image URLs and add storage path
    const images = product.images?.filter(img => img).map(img => `/storage/${img}`) || [];
    const currentImage = images[currentImageIndex];

    const cartItem = cartItems.find(item => item.id === product.id);

    const handlePreviousImage = (e) => {
        e?.stopPropagation();
        setCurrentImageIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        );
    };

    const handleNextImage = (e) => {
        e?.stopPropagation();
        setCurrentImageIndex((prev) =>
            prev === images.length - 1 ? 0 : prev + 1
        );
    };

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity > 0) {
            const quantityDifference = newQuantity - cartItem.quantity;
            if (availableQuantity - quantityDifference >= 0) {
                updateQuantity(product.id, newQuantity);
                setAvailableQuantity(prev => prev - quantityDifference);
            }
        }
    };

    const handleAddToCart = () => {
        if (!cartItem && availableQuantity > 0) {
            addToCart({ ...product, quantity: 1 });
            setAvailableQuantity(prev => prev - 1);
        }
    };

    const handleRemoveFromCart = () => {
        const currentCartQuantity = cartItem.quantity;
        removeFromCart(product.id);
        setAvailableQuantity(prev => prev + currentCartQuantity);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-premium-sapphire-800 via-premium-sapphire-750 to-premium-sapphire-800 relative overflow-hidden">
            {/* Enhanced 3D Background with Apple-inspired premium effects */}
            <div className="fixed inset-0 z-0">
                {/* Deep blue gradient foundation */}
                <div className="absolute inset-0 bg-gradient-to-br from-premium-sapphire-800 via-premium-sapphire-750 to-premium-sapphire-800"></div>

                {/* 3D geometric grid overlay */}
                <div className="absolute inset-0 opacity-5">
                    <div className="h-full w-full" style={{
                        backgroundImage: `
                            radial-gradient(circle at 25% 25%, rgba(212, 175, 55, 0.15) 0%, transparent 50%),
                            radial-gradient(circle at 75% 75%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
                            linear-gradient(rgba(212, 175, 55, 0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(212, 175, 55, 0.05) 1px, transparent 1px)
                        `,
                        backgroundSize: '400px 400px, 600px 600px, 80px 80px, 80px 80px'
                    }}></div>
                </div>

                {/* Premium 3D depth layers */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/15 to-black/40"></div>

                {/* Apple-style floating orbs with 3D depth */}
                <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-to-br from-premium-gold-500/10 to-premium-gold-600/5 rounded-full blur-3xl animate-float opacity-60"></div>
                <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gradient-to-tl from-premium-gold-400/8 to-transparent rounded-full blur-2xl animate-float opacity-40" style={{ animationDelay: '3s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-premium-gold-500/5 via-premium-gold-400/10 to-premium-gold-500/5 rounded-full blur-3xl animate-float opacity-30" style={{ animationDelay: '6s' }}></div>

                {/* Premium light beams */}
                <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-premium-gold-400/20 via-premium-gold-500/5 to-transparent"></div>
                <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-premium-gold-300/15 via-premium-gold-400/3 to-transparent"></div>

                {/* Subtle noise texture for premium feel */}
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.02] mix-blend-overlay"></div>
            </div>

            <Header />

            <div className="container mx-auto px-4 py-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Image Gallery */}
                    <div className="relative">
                        <div className="aspect-square rounded-xl overflow-hidden bg-premium-onyx-700/50 border border-premium-gold-500/20 backdrop-blur-md shadow-2xl">
                            <img
                                src={currentImage}
                                alt={product.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    console.error('Image failed to load:', currentImage);
                                    e.target.onerror = null;
                                    e.target.src = '/images/placeholder.jpg';
                                }}
                            />
                        </div>

                        {/* Navigation Buttons */}
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={handlePreviousImage}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-premium-onyx-900/90 text-premium-gold-400 hover:bg-premium-gold-500/20 transition-all duration-300 backdrop-blur-md border border-premium-gold-500/20 shadow-xl"
                                >
                                    <ChevronLeft className="w-6 h-6" />
                                </button>
                                <button
                                    onClick={handleNextImage}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-premium-onyx-900/90 text-premium-gold-400 hover:bg-premium-gold-500/20 transition-all duration-300 backdrop-blur-md border border-premium-gold-500/20 shadow-xl"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                    {images.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentImageIndex(index)}
                                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentImageIndex
                                                ? 'bg-premium-gold-400 scale-125'
                                                : 'bg-premium-gold-400/50 hover:bg-premium-gold-400/70'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}

                        {/* Thumbnail Navigation */}
                        <div className="flex gap-4 mt-4 overflow-x-auto pb-2">
                            {images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all backdrop-blur-md ${currentImageIndex === index
                                        ? 'border-premium-gold-500 shadow-lg shadow-premium-gold-500/30'
                                        : 'border-premium-gold-500/30 hover:border-premium-gold-500/50'
                                        }`}
                                >
                                    <img
                                        src={image}
                                        alt={`${product.title} thumbnail ${index + 1}`}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '/images/placeholder.jpg';
                                        }}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="lg:pl-8">
                        <div className="bg-gradient-to-br from-premium-onyx-800/60 to-premium-onyx-900/80 rounded-2xl p-8 border border-premium-gold-500/20 backdrop-blur-md shadow-2xl">
                            <h1 className="text-4xl font-playfair font-bold text-premium-pearl-50 mb-4">
                                {product.title}
                            </h1>

                            <div className="text-3xl font-bold bg-gradient-to-r from-premium-gold-400 to-premium-gold-500 bg-clip-text text-transparent mb-6">
                                {product.price}֏
                            </div>

                            <p className="text-premium-pearl-300 mb-8 leading-relaxed">
                                {product.description}
                            </p>

                            <div className="space-y-6">
                                {/* Cart Actions */}
                                {!cartItem ? (
                                    <button
                                        onClick={handleAddToCart}
                                        disabled={availableQuantity === 0}
                                        className={`w-full px-8 py-4 bg-gradient-to-r from-premium-gold-500 to-premium-gold-600 hover:from-premium-gold-600 hover:to-premium-gold-700 text-premium-onyx-900 font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-2xl ring-4 ring-premium-gold-500/20 hover:ring-premium-gold-500/40 ${availableQuantity === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    >
                                        {availableQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                                    </button>
                                ) : (
                                    <div className="flex flex-col gap-4 bg-premium-gold-500/20 p-4 rounded-xl border border-premium-gold-500/30 backdrop-blur-md">
                                        <div className="flex items-center justify-between">
                                            <span className="text-premium-pearl-200 font-medium">Quantity:</span>
                                            <div className="flex items-center gap-2 bg-premium-onyx-900/70 px-4 py-2 rounded-full backdrop-blur-sm border border-premium-gold-500/30">
                                                <button
                                                    onClick={() => handleQuantityChange(cartItem.quantity - 1)}
                                                    className="p-2 rounded-full bg-premium-gold-500/20 hover:bg-premium-gold-500/40 text-premium-gold-400 transition-all duration-300"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="text-premium-pearl-50 font-bold min-w-[24px] text-center text-lg">
                                                    {cartItem.quantity}
                                                </span>
                                                <button
                                                    onClick={() => handleQuantityChange(cartItem.quantity + 1)}
                                                    className="p-2 rounded-full bg-premium-gold-500/20 hover:bg-premium-gold-500/40 text-premium-gold-400 transition-all duration-300"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleRemoveFromCart}
                                            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-premium-ruby-700/80 hover:bg-premium-ruby-700/90 text-premium-ruby-100 font-semibold rounded-lg transition-all duration-300 border border-premium-ruby-500/30"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                            Remove
                                        </button>
                                    </div>
                                )}

                                {/* Stock Info */}
                                <div className="bg-premium-onyx-900/50 p-4 rounded-xl border border-premium-gold-500/20 backdrop-blur-md">
                                    <p className="text-premium-pearl-300 text-sm">
                                        {availableQuantity} items remaining
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage; 