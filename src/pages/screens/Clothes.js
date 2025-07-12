import { motion } from 'framer-motion';
import '../css/Clothes.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';


const Clothes = () => {
  const [clothes, setClothes] = useState({});
  const [alignLeft, setAlignLeft] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  let navigate = useNavigate();
  const categoryViewRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:5000/items/clothes')
      .then((response) => response.json())
      .then((data) => setClothes(data))
      .catch((error) => console.error('Error fetching clothes:', error));
  }, []);

  const clothClick = (imageUrl) => {
    setAlignLeft(true);
    setSelectedImage(imageUrl);
  }
  const addToCart = (image) => {
    setCartItems([...cartItems, image]);
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
      initial={{ opacity: 0, y: '100vh' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '-100vh' }}
      transition={{ duration: 1.0, ease: "easeInOut" }}
    >
      <div className='head'>
        <img src={require('../../assets/iconFashion.jpg')} alt="icon" />
        <h1>Clothes</h1>
      </div>

      <div className={`clothes-wrapper ${alignLeft ? 'align-left' : ''}`}>
  <div className="clothes-categories">
    <div className='pants' onClick={() => wideScreen("pants")}>
      <h2>Pants</h2>
      {(clothes.pants || []).map((image, index) => (
        <img key={index} src={image} alt={`Pants ${index}`} onClick={() => clothClick(image)} />
      ))}
    </div>

    <div className='tshirt' onClick={() => wideScreen("T-shirt")}>
      <h2>Tshirt</h2>
      {(clothes["T-shirt"] || []).map((image, index) => (
        <img key={index} src={image} alt={`Tshirt ${index}`} onClick={() => clothClick(image)} />
      ))}
    </div>

    <div className='shirt' onClick={() => wideScreen("shirts")}>
      <h2>Shirts</h2>
      {(clothes.shirts || []).map((image, index) => (
        <img key={index} src={image} alt={`Shirt ${index}`} onClick={() => clothClick(image)} />
      ))}
    </div>
  </div>

  {selectedImage && (
    <div className='selected-image'>
      <img src={selectedImage} alt="Selected cloth" 
      draggable 
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', selectedImage);
      }}
      />
      <div className='selected-image-actions'>
          <button className='back-button' onClick={() => {
            setAlignLeft(false);
            setSelectedImage(null);
          }}>Back</button>
          <button className='add-to-cart-button' onClick={() => addToCart(selectedImage)}>Add to Cart</button>
        </div>
    </div>
  )}
</div>
<div className='bottom-navigation'>
      <button>buy</button>
      <button 
      onDrop={(e)=> {
        e.preventDefault();
        const droppedimage = e.dataTransfer.getData('text/plain');
        if (droppedimage) {
          alert(`Added to cart: ${droppedimage}`);
          setCartItems([...cartItems, droppedimage]); 

        }
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
      }}
      onClick={() => {
        navigate('/cart', { state: { cartItems } });
      }}
      >
      🛒 Cart {cartItems.length} </button>
      <button>profile</button>
    </div>
    {selectedCategory && !selectedImage && (
      <div className='category-view' ref={categoryViewRef}>
        <h2>{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Collection</h2>
        <div className='category-images'>
          {(clothes[selectedCategory] || []).map((image, index) => {
            const productDetails = extractProductDetails(image);
            return (
              <div key={index} className="product-card">
                <img src={image} alt={`${selectedCategory} ${index}`} onClick={() => clothClick(image)}/>
                <div className="product-details">
                  <h3>{productDetails.name}</h3>
                  <p className="product-price">{productDetails.price}</p>
                  <p className="product-specs">
                    {productDetails.color} | {productDetails.material}
                  </p>
                  <p className="product-sizes">Sizes: {productDetails.sizes}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )}
    </motion.div>
  );
}

export default Clothes;
