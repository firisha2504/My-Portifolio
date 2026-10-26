import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ theme, toggleTheme }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');
  const isHomePage = location.pathname === '/';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
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
        <Link to="/" className="logo" onClick={() => setIsMobileMenuOpen(false)}>Portfolio</Link>
        
        <button 
          className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Mobile Menu Overlay */}
        <div 
          className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>

        <ul className={`nav-links ${isMobileMenuOpen ? 'mobile-active' : ''}`}>
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
          {/* Admin link hidden - access via direct URL: /login or /dashboard */}
          <li><button onClick={toggleTheme} className="theme-toggle">{theme === 'light' ? '🌙' : '☀️'}</button></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
