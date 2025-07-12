import { Outlet, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import './css/Layout.css';

const Layout = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const location = useLocation();

  // Function to toggle the menu visibility
  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  // Effect to handle route changes
  useEffect(() => {
    // On home page, always show the menu
    // On other pages, hide the menu initially
    setIsMenuVisible(location.pathname === '/');
  }, [location.pathname]);

  return (
    <>
      <nav className={location.pathname !== '/' ? 'with-toggle' : ''}>
        {location.pathname !== '/' && (
          <div className="menu-toggle" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
        
        <ul className={`nav-list ${!isMenuVisible ? 'hidden' : ''}`}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Login">Login</Link>
          </li>
          <li>
            <Link to="/blogs">Blogs</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/Tailers">Tailors</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;