import { motion } from 'framer-motion';
import '../css/Clothes.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { useCart } from '../../contexts/CartContext';


const Clothes = () => {
  const [clothes, setClothes] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { cartItems, addToCart, getCartItemCount } = useCart();
  let navigate = useNavigate();
  const categoryViewRef = useRef(null);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    console.log("Fetching clothes data from:", `${API_URL}/api/items/clothes`);
    fetch(`${API_URL}/api/items/clothes`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Clothes data received:", Object.keys(data));
        setClothes(data);
      })
      .catch((error) => {
        console.error('Error fetching clothes:', error);
        // Set empty data if there's an error
        setClothes({});
      });
  }, [API_URL]);

  const clothClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  }
  
  // Extract product details from filename
  const extractProductDetails = (imageUrl) => {
    // Get the filename from the URL
    const filename = imageUrl.split('/').pop();
    
    // Extract product details using regex or string operations
    const nameParts = filename.split('-');
    
    // Basic structure: Brand-Type-Price-Material-Color-Sizes.jpg
    const brand = nameParts[0];
    
    // Find the price (starts with $)
    let price = "N/A";
    let material = "N/A";
    let color = "N/A";
    let sizes = "N/A";
    
    // Look for price pattern
    for (let i = 0; i < nameParts.length; i++) {
      if (nameParts[i].includes('$') || nameParts[i].includes('.99')) {
        price = nameParts[i].includes('$') ? nameParts[i] : `$${nameParts[i]}`;
        
        // The next parts are likely material, color, and sizes
        if (i + 1 < nameParts.length) material = nameParts[i + 1];
        if (i + 2 < nameParts.length) color = nameParts[i + 2];
        
        // Sizes might be multiple parts
        if (i + 3 < nameParts.length) {
          sizes = nameParts.slice(i + 3).join('-').replace('.jpg', '');
        }
        
        break;
      }
    }
    
    // Create a product name from the first parts before price
    const productName = nameParts.slice(0, nameParts.findIndex(part => part.includes('$') || part.includes('.99'))).join(' ');
    
    return {
      name: productName || brand,
      brand,
      price,
      material,
      color,
      sizes,
      imageUrl
    };
  };
  
  const wideScreen = (category) => {
    setSelectedCategory(category);
    setTimeout(() => {
      if (categoryViewRef.current) {
        categoryViewRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);
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
            // Show all categories
            <>
              {/* Pants */}
              {(clothes.pants || []).map((image, index) => (
                <ProductCard 
                  key={`pants-${index}`} 
                  image={image} 
                  productDetails={extractProductDetails(image)}
                  onClick={() => clothClick(image)}
                />
              ))}
              {/* T-Shirts */}
              {(clothes["T-shirt"] || []).map((image, index) => (
                <ProductCard 
                  key={`tshirt-${index}`} 
                  image={image} 
                  productDetails={extractProductDetails(image)}
                  onClick={() => clothClick(image)}
                />
              ))}
              {/* Shirts */}
              {(clothes.shirts || []).map((image, index) => (
                <ProductCard 
                  key={`shirt-${index}`} 
                  image={image} 
                  productDetails={extractProductDetails(image)}
                  onClick={() => clothClick(image)}
                />
              ))}
            </>
          ) : (
            // Show only the selected category
            (clothes[selectedCategory] || []).map((image, index) => (
              <ProductCard 
                key={`${selectedCategory}-${index}`} 
                image={image} 
                productDetails={extractProductDetails(image)}
                onClick={() => clothClick(image)}
              />
            ))
          )}
        </div>
      </div>
      
      {/* Product Detail Modal */}
      {selectedImage && (
        <div className="product-detail-modal">
          <div className="modal-content">
            <div className="modal-close" onClick={() => setSelectedImage(null)}>×</div>
            <div className="modal-body">
              <div className="product-image">
                <img src={selectedImage} alt="Selected product" />
              </div>
              <div className="product-info">
                <h2>{extractProductDetails(selectedImage).name}</h2>
                <p className="product-brand">{extractProductDetails(selectedImage).brand}</p>
                <div className="product-price">{extractProductDetails(selectedImage).price}</div>
                <div className="product-specs">
                  <div className="spec-item">
                    <span className="spec-label">Material:</span> 
                    <span className="spec-value">{extractProductDetails(selectedImage).material}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Color:</span> 
                    <span className="spec-value">{extractProductDetails(selectedImage).color}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Available Sizes:</span> 
                    <span className="spec-value">{extractProductDetails(selectedImage).sizes}</span>
                  </div>
                </div>
                <div className="product-actions">
                  <button className="add-to-cart-button" onClick={() => addToCart(selectedImage)}>
                    Add to Cart
                  </button>
                  <button className="back-button" onClick={() => setSelectedImage(null)}>
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
const ProductCard = ({ image, productDetails, onClick }) => {
  return (
    <motion.div 
      className="product-card"
      whileHover={{ y: -10 }}
      onClick={onClick}
    >
      <div className="product-image">
        <img src={image} alt={productDetails.name} />
      </div>
      <div className="product-card-info">
        <h3 className="product-name">{productDetails.name}</h3>
        <div className="product-card-meta">
          <span className="product-price">{productDetails.price}</span>
          <span className="product-color">{productDetails.color}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Clothes;
