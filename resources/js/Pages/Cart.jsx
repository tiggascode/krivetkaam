import React from 'react';
import { Trash2, Plus, Minus, Phone } from 'lucide-react';
import { useCart } from "@/contexts/CartContext.jsx";
import Header from "@/Components/Header.jsx";


const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();

    return (
        <div className="min-h-screen bg-gradient-to-br from-premium-onyx-900 via-premium-sapphire-900 to-premium-onyx-800">
            <Header />

            <div className="container mx-auto px-4 py-12">
                <h1 className="text-4xl font-playfair font-bold text-premium-pearl-50 mb-8 text-center">
                    Your Cart
                </h1>

                {cartItems.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-premium-pearl-300 text-xl mb-4">Your cart is empty</p>
                        <a
                            href="/"
                            className="inline-block px-8 py-4 bg-premium-gold-500 hover:bg-premium-gold-600 text-premium-onyx-900 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            Continue Shopping
                        </a>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-premium-onyx-800/50 rounded-xl overflow-hidden border border-premium-gold-500/10 hover:border-premium-gold-500/30 transition-all duration-300"
                                >
                                    <div className="p-6 flex items-center gap-6">
                                        {/* Product Image */}
                                        <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Product Info */}
                                        <div className="flex-grow">
                                            <h3 className="text-xl font-playfair font-bold text-premium-pearl-50 mb-2">
                                                {item.name}
                                            </h3>
                                            <p className="text-premium-pearl-300 text-sm mb-4 line-clamp-2">
                                                {item.description}
                                            </p>

                                            {/* Price and Quantity */}
                                            <div className="flex items-center justify-between">
                                                <div className="text-premium-gold-400 font-bold">
                                                    ${item.price}
                                                </div>
                                                <div className="flex flex-col items-center gap-2">
                                                    <div className="flex items-center gap-2 bg-premium-onyx-900/50 px-3 py-1 rounded-full">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="p-1 rounded-full bg-premium-gold-500/20 hover:bg-premium-gold-500/30 text-premium-gold-400 transition-colors"
                                                        >
                                                            <Minus className="w-4 h-4" />
                                                        </button>
                                                        <span className="text-premium-pearl-50 font-medium min-w-[20px] text-center">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="p-1 rounded-full bg-premium-gold-500/20 hover:bg-premium-gold-500/30 text-premium-gold-400 transition-colors"
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="p-2 text-premium-ruby-400 hover:text-premium-ruby-300 transition-colors mt-2"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-premium-onyx-800/50 rounded-xl p-6 border border-premium-gold-500/10">
                                <h2 className="text-2xl font-playfair font-bold text-premium-pearl-50 mb-6">
                                    Order Summary
                                </h2>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-premium-pearl-300">
                                        <span>Subtotal</span>
                                        <span>${getTotalPrice()}</span>
                                    </div>
                                    <div className="flex justify-between text-premium-pearl-300">
                                        <span>Shipping</span>
                                        <span>Free</span>
                                    </div>
                                    <div className="h-px bg-premium-gold-500/20 my-4"></div>
                                    <div className="flex justify-between text-premium-pearl-50 font-bold">
                                        <span>Total</span>
                                        <span>${getTotalPrice()}</span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-center space-x-2 bg-premium-gold-500/20 text-premium-gold-400 py-4 rounded-lg font-semibold">
                                    <Phone className="w-5 h-5" />
                                    <span>+374 94616939</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
};

export default Cart;
