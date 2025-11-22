
import { motion } from 'framer-motion';
import '../css/Clothes.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Kids = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart, getCartItemCount } = useCart();
  const navigate = useNavigate();
  
  useEffect(() => {
    fetch(`${API_URL}/api/inventory?category=kids`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch(() => setProducts([]));
  }, []);

  return (
    <motion.div
      className="clothes-main"
      initial={{ opacity: 0, y: '100vh' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '-100vh' }}
      transition={{ duration: 1.0, ease: "easeInOut" }}
    >
      <div className='shop-header'>
        <h1>Kids Clothes</h1>
        <p className="shop-description">Discover our latest kids styles and find your perfect fit</p>
      </div>

      <div className="shop-wrapper">
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} onClick={() => setSelectedProduct(product)} />
          ))}
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="product-detail-modal">
          <div className="modal-content">
            <div className="modal-close" onClick={() => setSelectedProduct(null)}>×</div>
            <div className="modal-body">
              <div className="product-image">
                <img src={selectedProduct.image} alt={selectedProduct.name} />
              </div>
              <div className="product-info">
                <h2>{selectedProduct.name}</h2>
                <div className="product-price">₹{selectedProduct.price}</div>
                {selectedProduct.description && (
                  <p className="product-description">{selectedProduct.description}</p>
                )}
                <div className="product-specs">
                  <div className="spec-item">
                    <span className="spec-label">Stock:</span> 
                    <span className="spec-value">{selectedProduct.stock} units available</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Category:</span> 
                    <span className="spec-value">{selectedProduct.category}</span>
                  </div>
                </div>
                <div className="product-actions">
                  <button 
                    className="add-to-cart-button" 
                    onClick={() => {
                      addToCart(selectedProduct.image);
                      alert('Added to cart!');
                    }}
                    disabled={selectedProduct.stock === 0}
                  >
                    {selectedProduct.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                  <button className="back-button" onClick={() => setSelectedProduct(null)}>
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bottom-navigation">
        <button onClick={() => navigate('/cart')}>
          🛒 Cart {getCartItemCount()}
        </button>
        <button onClick={() => navigate('/profile')}>Profile</button>
      </div>
    </motion.div>
  );
};

const ProductCard = ({ product, onClick }) => {
  return (
    <motion.div 
      className="product-card"
      whileHover={{ y: -10 }}
      onClick={onClick}
    >
      <div className="product-image">
        <img src={product.image} alt={product.name} style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'8px'}} />
        {product.stock < 10 && (
          <div style={{position:'absolute',top:8,right:8,background:'#ef4444',color:'#fff',padding:'4px 8px',borderRadius:4,fontSize:'0.75rem',fontWeight:600}}>
            Only {product.stock} left!
          </div>
        )}
      </div>
      <div className="product-card-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-card-meta">
          <span className="product-price">₹{product.price}</span>
          <span className="product-color" style={{fontSize:'0.85rem',color:'#666'}}>Stock: {product.stock}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Kids;