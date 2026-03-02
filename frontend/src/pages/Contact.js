import React, { useState } from 'react';
import API from '../utils/api';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await API.post('/contacts', formData);
      setStatus({ type: 'success', message: 'Message sent successfully!' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus({ type: 'error', message: error.response?.data?.message || 'Failed to send message' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact">
      <div className="container">
        <h1>Contact Me</h1>
        <form onSubmit={handleSubmit} className="contact-form">
          <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
          <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} />
          <textarea name="message" placeholder="Your Message" rows="5" value={formData.message} onChange={handleChange} required />
          <button type="submit" className="btn-primary" disabled={loading}>{loading ? 'Sending...' : 'Send Message'}</button>
          {status.message && <div className={status.type}>{status.message}</div>}
        </form>
      </div>
    </div>
  );
};

export default Contact;
