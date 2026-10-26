import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ theme, toggleTheme }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('token');
  const isDashboard = location.pathname.startsWith('/dashboard');
  const isHomePage = location.pathname === '/';

  const handleAdminClick = (e) => {
    if (isLoggedIn) {
      e.preventDefault();
      navigate('/dashboard');
    }
  };

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    if (isHomePage) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">Portfolio</Link>
        <ul className="nav-links">
          {!isDashboard && (
            <>
              <li>
                <a 
                  href="#hero" 
                  onClick={(e) => isHomePage ? scrollToSection(e, 'hero') : navigate('/')}
                  className={location.pathname === '/' && location.hash === '' ? 'active' : ''}
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  onClick={(e) => scrollToSection(e, 'about')}
                  className={location.hash === '#about' ? 'active' : ''}
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  href="#projects" 
                  onClick={(e) => scrollToSection(e, 'projects')}
                  className={location.hash === '#projects' ? 'active' : ''}
                >
                  Projects
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  onClick={(e) => scrollToSection(e, 'contact')}
                  className={location.hash === '#contact' ? 'active' : ''}
                >
                  Contact
                </a>
              </li>
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
