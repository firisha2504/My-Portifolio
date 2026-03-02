import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="container">
        <div className="not-found-content">
          <h1 className="error-code">404</h1>
          <h2>Page Not Found</h2>
          <p>Oops! The page you're looking for doesn't exist.</p>
          <div className="not-found-buttons">
            <Link to="/" className="btn-primary">Go Home</Link>
            <Link to="/projects" className="btn-secondary">View Projects</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
