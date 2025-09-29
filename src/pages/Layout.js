import { Outlet, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './css/Layout.css';

const Layout = () => {
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Function to handle logout
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out');
    }
  };

  return (
    <>
      <nav className={scrolled ? 'scrolled' : ''}>
        <Link to="/" className="brand">E-SHOP</Link>
        
        <ul className="nav-list">
          <li>
            <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
          </li>
          {currentUser ? (
            <>
              <li>
                <Link to="/clothes" className={location.pathname === "/clothes" ? "active" : ""}>Shop</Link>
              </li>
              <li>
                <Link to="/cart" className={location.pathname === "/cart" ? "active" : ""}>Cart</Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/Login" className={location.pathname === "/Login" ? "active" : ""}>Login</Link>
            </li>
          )}
          <li>
            <Link to="/blogs" className={location.pathname === "/blogs" ? "active" : ""}>Blogs</Link>
          </li>
          <li>
            <Link to="/contact" className={location.pathname === "/contact" ? "active" : ""}>Contact</Link>
          </li>
          <li>
            <Link to="/Tailers" className={location.pathname === "/Tailers" ? "active" : ""}>Tailors</Link>
          </li>
        </ul>
        
        {/* User info and logout */}
        {currentUser && (
          <div className="user-controls">
            <span className="user-info">{currentUser.displayName || currentUser.email}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        )}
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;