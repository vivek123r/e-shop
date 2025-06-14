import { motion } from 'framer-motion';
import '../css/Clothes.css';
import { useEffect, useState } from 'react';

const Clothes = () => {
  const [clothes, setClothes] = useState({});
  const [alignLeft, setAlignLeft] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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

  return (
    <>
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
    <div className='pants'>
      <p>show more</p>
      <h2>Pants</h2>
      {(clothes.pants || []).map((image, index) => (
        <img key={index} src={image} alt={`Pants ${index}`} onClick={() => clothClick(image)} />
      ))}
    </div>

    <div className='tshirt'>
      <h2>Tshirt</h2>
      {(clothes["T-shirt"] || []).map((image, index) => (
        <img key={index} src={image} alt={`Tshirt ${index}`} onClick={() => clothClick(image)} />
      ))}
    </div>

    <div className='shirt'>
      <h2>Shirts</h2>
      {(clothes.shirts || []).map((image, index) => (
        <img key={index} src={image} alt={`Shirt ${index}`} onClick={() => clothClick(image)} />
      ))}
    </div>
  </div>

  {selectedImage && (
    <div className='selected-image'>
      <img src={selectedImage} alt="Selected cloth" />
      <button className='back-button' onClick={() => {
        setAlignLeft(false);
        setSelectedImage(null);
      }
      }>back</button>
    </div>
  )}
</div>
<div className='bottom-navigation'>
      <button>buy</button>
      <button>cart</button>
      <button>profile</button>
    </div>
    </motion.div>
    </>
  );
}

export default Clothes;
