

import { motion } from 'framer-motion';
import '../css/Clothes.css';
import { useEffect, useState } from 'react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Classy = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/items/clothes`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setImages(data.classy || []);
      })
      .catch(() => setImages([]));
  }, []);

  const extractProductDetails = (imageUrl) => {
    const filename = imageUrl.split('/').pop();
    return {
      name: filename.replace(/\.(jpg|jpeg|webp|png)$/i, ''),
      price: '₹1499',
      color: 'Color',
      material: 'Material',
      sizes: 'S, M, L',
      imageUrl
    };
  };

  return (
    <motion.div
      className="clothes-main"
      initial={{ opacity: 0, y: '100vh' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '-100vh' }}
      transition={{ duration: 1.0, ease: "easeInOut" }}
    >
      <div className='shop-header'>
        <h1>Classy Clothes</h1>
        <p className="shop-description">Discover our latest classy styles and find your perfect fit</p>
      </div>

      <div className="shop-wrapper">
        <div className="products-grid">
          {images.map((image, idx) => (
            <ProductCard key={idx} image={image} productDetails={extractProductDetails(image)} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ProductCard = ({ image, productDetails }) => {
  return (
    <motion.div 
      className="product-card"
      whileHover={{ y: -10 }}
    >
      <div className="product-image">
        <img src={image} alt={productDetails.name} style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'8px'}} />
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

export default Classy;