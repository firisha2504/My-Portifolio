import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import API from '../utils/api';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <div className="dashboard-sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <Link to="/dashboard/profile">Profile</Link>
          <Link to="/dashboard/projects">Projects</Link>
          <Link to="/dashboard/contacts">Messages</Link>
          <Link to="/dashboard/settings">Settings</Link>
          <button onClick={handleLogout} className="btn-primary">Logout</button>
        </nav>
      </div>
      <div className="dashboard-content">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/profile" element={<ProfileManager />} />
          <Route path="/projects" element={<ProjectsManager />} />
          <Route path="/contacts" element={<ContactsManager />} />
          <Route path="/settings" element={<AdminSettings />} />
        </Routes>
      </div>
    </div>
  );
};

const DashboardHome = () => <div><h1>Welcome to Admin Dashboard</h1></div>;

const ProfileManager = () => {
  const [profile, setProfile] = useState({ name: '', title: '', bio: '', resume_link: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put('/profile', profile);
      alert('Profile updated!');
    } catch (error) {
      alert('Failed to update profile');
    }
  };

  return (
    <div>
      <h1>Manage Profile</h1>
      <form onSubmit={handleSubmit} className="form">
        <input type="text" placeholder="Name" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} />
        <input type="text" placeholder="Title" value={profile.title} onChange={(e) => setProfile({...profile, title: e.target.value})} />
        <textarea placeholder="Bio" value={profile.bio} onChange={(e) => setProfile({...profile, bio: e.target.value})} />
        <input type="text" placeholder="Resume Link" value={profile.resume_link} onChange={(e) => setProfile({...profile, resume_link: e.target.value})} />
        <button type="submit" className="btn-primary">Update Profile</button>
      </form>
    </div>
  );
};

const ProjectsManager = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data } = await API.get('/projects');
    setProjects(data.data);
  };

  const deleteProject = async (id) => {
    if (window.confirm('Delete this project?')) {
      await API.delete(`/projects/${id}`);
      fetchProjects();
    }
  };

  return (
    <div>
      <h1>Manage Projects</h1>
      <div className="projects-list">
        {projects.map(p => (
          <div key={p.id} className="project-item">
            <h3>{p.title}</h3>
            <button onClick={() => deleteProject(p.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const ContactsManager = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const { data } = await API.get('/contacts');
    setContacts(data.data);
  };

  return (
    <div>
      <h1>Contact Messages</h1>
      <div className="contacts-list">
        {contacts.map(c => (
          <div key={c.id} className="contact-item">
            <h3>{c.name} - {c.email}</h3>
            <p>{c.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const AdminSettings = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const { data } = await API.get('/auth/profile');
      setFormData({
        ...formData,
        username: data.data.username,
        email: data.data.email
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    // Validate passwords match if changing password
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      setLoading(false);
      return;
    }

    try {
      await API.put('/auth/profile', {
        username: formData.username,
        email: formData.email,
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });

      setMessage({ type: 'success', text: 'Settings updated successfully!' });
      setFormData({ ...formData, currentPassword: '', newPassword: '', confirmPassword: '' });
      
      // Update stored user data
      const user = JSON.parse(localStorage.getItem('user'));
      user.username = formData.username;
      user.email = formData.email;
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to update settings' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-settings">
      <h1>Account Settings</h1>
      <form onSubmit={handleSubmit} className="settings-form">
        <div className="form-section">
          <h2>Account Information</h2>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h2>Change Password</h2>
          <p className="form-hint">Leave blank if you don't want to change your password</p>
          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="Enter current password"
            />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
            />
          </div>
          <div className="form-group">
            <label>Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
            />
          </div>
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </button>

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}
      </form>
    </div>
  );
};

export default Dashboard;
