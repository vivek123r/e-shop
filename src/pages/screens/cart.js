import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../../contexts/CartContext';
import '../css/Cart.css';

function Cart() {
    const location = useLocation();
    const navigate = useNavigate();
    const { cartItems, removeFromCart, updateQuantity, getCartTotal, loading } = useCart();
    const [showContinueShopping, setShowContinueShopping] = useState(true);
    
    // Add scroll event listener to hide/show continue shopping button
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setShowContinueShopping(false);
            } else {
                setShowContinueShopping(true);
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (loading) {
        return <div>Loading cart...</div>;
    }

    return (
        <motion.div
            className="cart-container"
            initial={{ opacity: 0, y: '100vh' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100vh' }}
            transition={{ duration: 1.0, ease: "easeInOut" }}
        >
            <div className="cart-header">
                <h1>Shopping Cart</h1>
                {showContinueShopping && (
                    <button className="continue-shopping" onClick={() => navigate('/clothes')}>
                        Continue Shopping
                    </button>
                )}
            </div>
            
            {cartItems.length === 0 ? (
                <div className="empty-cart">
                    <h2>Your cart is empty</h2>
                    <p>Add some items to your cart to see them here</p>
                    <button className="shop-now-btn" onClick={() => navigate('/clothes')}>
                        Shop Now
                    </button>
                </div>
            ) : (
                <div className="cart-content">
                    <div className="cart-items">
                        {cartItems.map((item, index) => (
                            <div key={index} className="cart-item">
                                <div className="item-image">
                                    <img src={item.imageUrl} alt={`Cart item ${index + 1}`} />
                                </div>
                                <div className="item-details">
                                    <h3>Item #{index + 1}</h3>
                                    <p className="item-price">$19.99</p>
                                    <div className="item-quantity">
                                        <label>Quantity:</label>
                                        <select value={item.quantity || 1} onChange={(e) => {
                                                updateQuantity(item.id, parseInt(e.target.value));
                                            }}>
                                            {[1, 2, 3, 4, 5].map(num => (
                                                <option key={num} value={num}>{num}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <button 
                                    className="remove-button"
                                    onClick={() => removeFromCart(item)}
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                    
                    <div className="cart-summary">
                        <h2>Order Summary</h2>
                        {cartItems.map((item, index) => (
                            <div key={index} className="summary-item-row">
                                <span>Item #{index + 1} × {item.quantity || 1}</span>
                                <span>${((item.quantity || 1) * 19.99).toFixed(2)}</span>
                            </div>
                        ))}
                        <div className="summary-row">
                            <span>Shipping:</span>
                            <span>$0.00</span>
                        </div>
                        <div className="summary-row total">
                            <span>Total:</span>
                            <span>${getCartTotal()}</span>
                        </div>
                        <button className="checkout-button">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </motion.div>
    );
}

export default Cart;
