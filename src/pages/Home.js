import './css/Home.css';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const categories = [
  { name: 'clothes', img: 'http://localhost:5000/images/clothes.jpg', label: 'All Clothes' },
  { name: 'modern', img: 'http://localhost:5000/images/headphones.webp', label: 'Modern' },
  { name: 'classy', img: 'http://localhost:5000/images/accessories.jpg', label: 'Classy' },
  { name: 'wedding', img: 'http://localhost:5000/images/shoes.webp', label: 'Wedding' },
  { name: 'casual', img: 'http://localhost:5000/images/books.avif', label: 'Casual' },
  { name: 'kids', img: 'http://localhost:5000/images/toys.webp', label: 'Kids' },
];

const Home = () => {
  const navigate = useNavigate();

  const handleClick = (category) => {
    navigate(`/${category.name}`); // navigates to /clothes, /modern, etc.
  };

  return (
    <motion.div
      className="home-main"
      initial={{ opacity: 0, y: '100vh' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '-100vh' }}
      transition={{ duration: 1.0, ease: 'easeInOut' }}
    >
    <div className="home-main">
      <div className="left-panel">
        <h1>E-SHOP</h1>
        <p>Your one-stop shop for all your needs!</p>
        <p>Shop now and enjoy great deals!</p>
        <div className='Tailers'>
          <h2>Tailers</h2>
          <p>we are hiring tailers for our store</p>
          <button onClick={() => navigate('/tailers')}>Apply Now</button>
        </div>
      </div>

      <div className="right-panel">
        {categories.map((item) => (
          <div key={item.name} className="category-tile">
            <img src={item.img} alt={item.name} />
            <button onClick={() => handleClick(item.name)}>{item.name}</button>
          </div>
        ))}
      </div>
    </div>
    </motion.div>
  );
};

export default Home;
