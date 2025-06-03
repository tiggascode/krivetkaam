import { useRef, useEffect } from 'react';
import { withMemo, useOptimizedMemo } from '@/utils/componentOptimizer.jsx';
import { optimizeLayoutStyles, optimizeTextStyles } from '@/utils/styleOptimizer.jsx';
import { useOptimizedImage, getOptimizedImageUrl } from '@/utils/imageOptimizer.jsx';
import { useCart } from '@/contexts/CartContext.jsx';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity } = useCart();
    const cartRef = useRef(null);
    const totalRef = useRef(null);

    useEffect(() => {
        if (cartRef.current) {
            optimizeLayoutStyles(cartRef.current);
        }
        if (totalRef.current) {
            optimizeTextStyles(totalRef.current);
        }
    }, []);

    const total = useOptimizedMemo(() => {
        return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }, [cartItems]);

    return (
        <div
            ref={cartRef}
            className="optimized-layout bg-white rounded-lg shadow-lg p-6"
        >
            <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>

            {cartItems.length === 0 ? (
                <p className="text-gray-500">Your cart is empty</p>
            ) : (
                <>
                    <div className="space-y-4">
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between p-4 border-b"
                            >
                                <div className="flex items-center space-x-4">
                                    <img
                                        src={getOptimizedImageUrl(item.primary_image)}
                                        alt={item.title}
                                        className="w-20 h-20 object-cover rounded"
                                        loading="lazy"
                                    />
                                    <div>
                                        <h3 className="font-semibold">{item.title}</h3>
                                        <p className="text-gray-600">${item.price}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="px-2 py-1 border rounded"
                                            disabled={item.quantity <= 1}
                                        >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="px-2 py-1 border rounded"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 pt-6 border-t">
                        <div className="flex justify-between items-center">
                            <span ref={totalRef} className="optimized-text text-xl font-bold">
                                Total: ${total.toFixed(2)}
                            </span>
                            <button
                                className="bg-premium-gold-500 text-white px-6 py-2 rounded-md hover:bg-premium-gold-600 transition-colors duration-300"
                                onClick={() => {/* Checkout logic */ }}
                            >
                                Checkout
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default withMemo(Cart); 