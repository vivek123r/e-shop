import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../css/Cart.css';

function Cart() {
    const location = useLocation();
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [quantities, setQuantities] = useState([1]);
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
    
    useEffect(() => {
        // Get cart items from location state
        if (location.state && location.state.cartItems) {
            setCartItems(location.state.cartItems);
        }
    }, [location]);

    const removeItem = (index) => {
        const newCartItems = [...cartItems];
        newCartItems.splice(index, 1);
        setCartItems(newCartItems);
    };

    const calculateItemsTotal = () => {
        // Calculate total based on quantity of each item
        return cartItems.reduce((total, _, index) => {
            return total + (quantities[index] || 1) * 19.99;
        }, 0).toFixed(2);
    };
    
    const calculateTotal = () => {
        return parseFloat(calculateItemsTotal()).toFixed(2);
    };

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
                                    <img src={item} alt={`Cart item ${index + 1}`} />
                                </div>
                                <div className="item-details">
                                    <h3>Item #{index + 1}</h3>
                                    <p className="item-price">$19.99</p>
                                    <div className="item-quantity">
                                        <label>Quantity:</label>
                                        <select defaultValue="1" onChange={(e) => {
                                                const newQuantities = {...quantities};
                                                newQuantities[index] = parseInt(e.target.value);
                                                setQuantities(newQuantities);
                                            }}>
                                            {[1, 2, 3, 4, 5].map(num => (
                                                <option key={num} value={num}>{num}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <button 
                                    className="remove-button"
                                    onClick={() => removeItem(index)}
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
                                <span>Item #{index + 1} × {quantities[index] || 1}</span>
                                <span>${((quantities[index] || 1) * 19.99).toFixed(2)}</span>
                            </div>
                        ))}
                        <div className="summary-row">
                            <span>Shipping:</span>
                            <span>$0.00</span>
                        </div>
                        <div className="summary-row total">
                            <span>Total:</span>
                            <span>${calculateTotal()}</span>
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
