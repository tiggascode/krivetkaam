import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('oceanFreshCart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem('oceanFreshCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    console.log('addToCart - Incoming product:', product);
    // Ensure consistent image paths
    const processedProduct = {
      ...product,
      images: product.images?.map(img => {
        if (!img) return null;
        // If it's already a full URL, return as is
        if (img.startsWith('http')) return img;
        // If it already has /storage/ prefix, return as is
        if (img.startsWith('/storage/')) return img;
        // Otherwise, add /storage/ prefix
        return `/storage/${img}`;
      }).filter(Boolean) // Remove any null values
    };

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === processedProduct.id);
      if (existingItem) {
        console.log('addToCart - Existing item found:', existingItem);
        return prevItems.map(item =>
          item.id === processedProduct.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      console.log('addToCart - New item added:', { ...processedProduct, quantity: 1 });
      return [...prevItems, {
        ...processedProduct,
        quantity: 1
      }];
    });
  };

  const removeFromCart = (productId) => {
    console.log('removeFromCart - Product ID:', productId);
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    console.log('updateQuantity - Product ID:', productId, 'New Quantity:', newQuantity);
    if (newQuantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.id === productId) {
          console.log('updateQuantity - Updating item:', item, 'with new quantity:', newQuantity);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    console.log('Calculating total price for items:', cartItems);
    const total = cartItems.reduce((total, item) => {
      // Remove commas from price string and convert to number
      const itemPrice = Number(String(item.price).replace(/,/g, '')) || 0;
      const itemQuantity = Number(item.quantity) || 0;
      const itemTotal = itemPrice * itemQuantity;
      console.log(`Item ${item.name}: Price=${itemPrice}, Quantity=${itemQuantity}, Total=${itemTotal}`);
      return total + itemTotal;
    }, 0);
    console.log('Final total:', total);
    return total;
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
