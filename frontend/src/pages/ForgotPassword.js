import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';
import Modal from '../components/Modal';
import './Login.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [modal, setModal] = useState({ isOpen: false, type: '', title: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post('/auth/forgot-password', { email });
      setModal({
        isOpen: true,
        type: 'success',
        title: 'Email Sent!',
        message: 'Password reset instructions have been sent to your email.'
      });
      setEmail('');
    } catch (error) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Error',
        message: error.response?.data?.message || 'Failed to send reset email. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-card">
          <h1>Forgot Password</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Enter your email address and we'll send you instructions to reset your password.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
            <button type="submit" className="btn-login" disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <Link to="/login" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
              Back to Login
            </Link>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
        type={modal.type}
        title={modal.title}
        message={modal.message}
      />
    </div>
  );
};

export default ForgotPassword;
