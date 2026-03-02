import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ theme, toggleTheme }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('token');
  const isDashboard = location.pathname.startsWith('/dashboard');

  const handleAdminClick = (e) => {
    if (isLoggedIn) {
      e.preventDefault();
      navigate('/dashboard');
    }
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">Portfolio</Link>
        <ul className="nav-links">
          {!isDashboard && (
            <>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/projects">Projects</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </>
          )}
          <li>
            <Link to={isLoggedIn ? "/dashboard" : "/login"} onClick={handleAdminClick}>
              Admin
            </Link>
          </li>
          <li><button onClick={toggleTheme} className="theme-toggle">{theme === 'light' ? '🌙' : '☀️'}</button></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
