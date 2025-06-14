import './css/Home.css';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const categories = [
  { name: 'Clothes', img: 'http://localhost:5000/images/clothes.jpg' },
  { name: 'Electronics', img: 'http://localhost:5000/images/headphones.webp' },
  { name: 'Accessories', img: 'http://localhost:5000/images/accessories.jpg' },
  { name: 'Shoes', img: 'http://localhost:5000/images/shoes.webp' },
  { name: 'Books', img: 'http://localhost:5000/images/books.avif' },
  { name: 'Toys', img: 'http://localhost:5000/images/toys.webp' },
];

const Home = () => {
  const navigate = useNavigate();

  const handleClick = (category) => {
    navigate(`/${category}`); // navigates to /clothes, /books, etc.
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
