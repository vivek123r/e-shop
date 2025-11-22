import { motion } from 'framer-motion';
import '../css/Clothes.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { useCart } from '../../contexts/CartContext';


const Clothes = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { cartItems, addToCart, getCartItemCount } = useCart();
  let navigate = useNavigate();
  const categoryViewRef = useRef(null);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    console.log("Fetching products from inventory API");
    fetch(`${API_URL}/api/inventory`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Products received:", data.length);
        // Filter only pants, shirts, and T-shirt categories
        const clothesProducts = data.filter(p => 
          p.category === 'pants' || p.category === 'shirts' || p.category === 'T-shirt'
        );
        setProducts(clothesProducts);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setProducts([]);
      });
  }, [API_URL]);

  const clothClick = (product) => {
    setSelectedProduct(product);
  }
  
  const wideScreen = (category) => {
    setSelectedCategory(category);
    setTimeout(() => {
      if (categoryViewRef.current) {
        categoryViewRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
  }

  // Get products by category
  const getProductsByCategory = (category) => {
    return products.filter(p => p.category === category);
  }
  
  return (
    <motion.div
      className="clothes-main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className='shop-header'>
        <h1>Shop Collection</h1>
        <p className="shop-description">Discover our latest styles and find your perfect fit</p>
      </div>

      <div className="shop-categories">
        <button 
          className={`category-tab ${!selectedCategory ? 'active' : ''}`}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </button>
        <button 
          className={`category-tab ${selectedCategory === 'pants' ? 'active' : ''}`}
          onClick={() => wideScreen("pants")}
        >
          Pants
        </button>
        <button 
          className={`category-tab ${selectedCategory === 'T-shirt' ? 'active' : ''}`}
          onClick={() => wideScreen("T-shirt")}
        >
          T-Shirts
        </button>
        <button 
          className={`category-tab ${selectedCategory === 'shirts' ? 'active' : ''}`}
          onClick={() => wideScreen("shirts")}
        >
          Shirts
        </button>
      </div>

      <div className="shop-wrapper" ref={categoryViewRef}>
        <div className="products-grid">
          {/* Display products based on selected category or all products */}
          {!selectedCategory ? (
            // Show all products
            products.map((product, index) => (
              <ProductCard 
                key={product._id || index}
                product={product}
                onClick={() => clothClick(product)}
              />
            ))
          ) : (
            // Show only the selected category
            getProductsByCategory(selectedCategory).map((product, index) => (
              <ProductCard 
                key={product._id || index}
                product={product}
                onClick={() => clothClick(product)}
              />
            ))
          )}
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
                    onClick={() => addToCart(selectedProduct.image)}
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
        <button 
          onDrop={(e) => {
            e.preventDefault();
            const droppedimage = e.dataTransfer.getData('text/plain');
            if (droppedimage) {
              addToCart(droppedimage);
              alert(`Added to cart!`); 
            }
          }}
          onDragOver={(e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
          }}
          onClick={() => {
            navigate('/cart');
          }}
        >
          🛒 Cart {getCartItemCount()}
        </button>
        <button onClick={() => navigate('/profile')}>Profile</button>
      </div>
    </motion.div>
  );
};

// Product Card Component
const ProductCard = ({ product, onClick }) => {
  return (
    <motion.div 
      className="product-card"
      whileHover={{ y: -10 }}
      onClick={onClick}
    >
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        {product.stock < 10 && product.stock > 0 && (
          <div className="stock-badge low-stock">
            Only {product.stock} left!
          </div>
        )}
        {product.stock === 0 && (
          <div className="stock-badge out-of-stock">
            Out of Stock
          </div>
        )}
      </div>
      <div className="product-card-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="product-card-meta">
          <span className="product-price">₹{product.price}</span>
          <span className="product-stock">{product.stock} in stock</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Clothes;
