import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { db } from '../firebase/config';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  arrayUnion, 
  arrayRemove,
  onSnapshot 
} from 'firebase/firestore';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  // Load cart data when user logs in
  useEffect(() => {
    if (currentUser) {
      const cartRef = doc(db, 'carts', currentUser.uid);
      
      // Set up real-time listener for cart changes
      const unsubscribe = onSnapshot(cartRef, (doc) => {
        if (doc.exists()) {
          const data = doc.data();
          setCartItems(data.items || []);
        } else {
          // Create new cart document if it doesn't exist
          setDoc(cartRef, { items: [], createdAt: new Date() });
          setCartItems([]);
        }
        setLoading(false);
      }, (error) => {
        console.error('Error loading cart:', error);
        setLoading(false);
      });

      return () => unsubscribe();
    } else {
      // Clear cart when user logs out
      setCartItems([]);
      setLoading(false);
    }
  }, [currentUser]);

  // Add item to cart
  const addToCart = async (item) => {
    if (!currentUser) {
      alert('Please log in to add items to cart');
      return;
    }

    try {
      const cartRef = doc(db, 'carts', currentUser.uid);
      
      // Create cart item object with metadata
      const cartItem = {
        id: Date.now().toString(),
        imageUrl: item,
        addedAt: new Date().toISOString(),
        quantity: 1
      };

      // Try to get the document first
      const cartDoc = await getDoc(cartRef);
      
      if (cartDoc.exists()) {
        // Document exists, update it
        const currentItems = cartDoc.data().items || [];
        const updatedItems = [...currentItems, cartItem];
        
        await updateDoc(cartRef, {
          items: updatedItems,
          updatedAt: new Date().toISOString()
        });
      } else {
        // Document doesn't exist, create it
        await setDoc(cartRef, {
          items: [cartItem],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemToRemove) => {
    if (!currentUser) return;

    try {
      const cartRef = doc(db, 'carts', currentUser.uid);
      
      await updateDoc(cartRef, {
        items: arrayRemove(itemToRemove),
        updatedAt: new Date()
      });

      console.log('Item removed from cart successfully');
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  // Update item quantity
  const updateQuantity = async (itemId, newQuantity) => {
    if (!currentUser) return;

    try {
      const cartRef = doc(db, 'carts', currentUser.uid);
      const cartDoc = await getDoc(cartRef);
      
      if (cartDoc.exists()) {
        const currentItems = cartDoc.data().items || [];
        const updatedItems = currentItems.map(item => 
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        );

        await updateDoc(cartRef, {
          items: updatedItems,
          updatedAt: new Date()
        });
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    if (!currentUser) return;

    try {
      const cartRef = doc(db, 'carts', currentUser.uid);
      await updateDoc(cartRef, {
        items: [],
        updatedAt: new Date()
      });

      console.log('Cart cleared successfully');
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  // Get cart total
  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + (item.quantity || 1) * 19.99; // Using fixed price for now
    }, 0).toFixed(2);
  };

  // Get cart item count
  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  const value = {
    cartItems,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
