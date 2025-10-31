import './css/Home.css';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const categories = [
  { name: 'modern', img: `${API_URL}/images/mordern.jpg`, label: 'Modern' },
  { name: 'classy', img: `${API_URL}/images/classy.png`, label: 'Classy' },
  { name: 'wedding', img: `${API_URL}/images/wedding.jpeg`, label: 'Wedding' },
  { name: 'casual', img: `${API_URL}/images/casual.jpg`, label: 'Casual' },
  { name: 'kids', img: `${API_URL}/images/kids.jpg`, label: 'Kids' },
];

const Home = () => {
  const navigate = useNavigate();

  const handleClick = (category) => {
    navigate(`/${category}`); // navigates to /clothes, /modern, etc.
  };

  return (
    <motion.div
      className="home-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <div className="hero-section">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1>Discover Your Style</h1>
          <p className="hero-subtitle">Premium quality products for your lifestyle</p>
          <button className="cta-button" onClick={() => navigate('/clothes')}>
            Shop Now
          </button>
        </motion.div>
      </div>
      
      {/* Categories Section */}
      <section className="categories-section">
        <h2 className="section-title">Shop by Category</h2>
        <div className="categories-grid">
          {categories.map((item, index) => (
            <motion.div 
              key={item.name} 
              className="category-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => handleClick(item.name)}
            >
              <div className="category-image-container">
                <img src={item.img} alt={item.name} className="category-image" />
              </div>
              <h3 className="category-name">{item.label}</h3>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Tailers Section */}
      <section className="tailers-section">
        <div className="tailers-content">
          <h2>Join Our Team</h2>
          <p>We are hiring tailors with exceptional skills. Build a career with us!</p>
          <button onClick={() => navigate('/tailers')}>Apply Now</button>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
