import { Outlet, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './css/Layout.css';

const Layout = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const location = useLocation();
  const { currentUser, logout } = useAuth();

  // Function to handle logout
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out');
    }
  };

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
          {currentUser && location.pathname !== '/' ? (
            <>
              <li>
                <Link to="/clothes">Shop</Link>
              </li>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
            </>
          ) : !currentUser ? (
            <li>
              <Link to="/Login">Login</Link>
            </li>
          ) : null}
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
        
        {/* User info and logout - only on home page, positioned on the right */}
        {currentUser && location.pathname === '/' && (
          <div className="user-controls">
            <span className="user-info">Hello, {currentUser.displayName || currentUser.email}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        )}
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;