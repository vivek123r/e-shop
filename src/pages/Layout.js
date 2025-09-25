import { Outlet, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './css/Layout.css';

const Layout = () => {
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

  return (
    <>
      <nav>
        <Link to="/" className="brand">E-SHOP</Link>
        
        <ul className="nav-list">
          <li>
            <Link to="/">Home</Link>
          </li>
          {currentUser ? (
            <>
              <li>
                <Link to="/clothes">Shop</Link>
              </li>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/Login">Login</Link>
            </li>
          )}
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