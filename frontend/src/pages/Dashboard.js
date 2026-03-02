import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import API from '../utils/api';
import Modal from '../components/Modal';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="dashboard">
      <div className="dashboard-sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <Link to="/" className="back-to-home-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Back to Home
          </Link>
          <div className="nav-divider"></div>
          <Link to="/dashboard" className={isActive('/dashboard') && location.pathname === '/dashboard' ? 'active' : ''}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"/>
              <rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/>
            </svg>
            Overview
          </Link>
          <Link to="/dashboard/profile" className={isActive('/dashboard/profile') ? 'active' : ''}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            Profile
          </Link>
          <Link to="/dashboard/projects" className={isActive('/dashboard/projects') ? 'active' : ''}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
            </svg>
            Projects
          </Link>
          <Link to="/dashboard/contacts" className={isActive('/dashboard/contacts') ? 'active' : ''}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            Messages
          </Link>
          <Link to="/dashboard/settings" className={isActive('/dashboard/settings') ? 'active' : ''}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 1v6m0 6v6m9-9h-6m-6 0H3"/>
            </svg>
            Settings
          </Link>
        </nav>
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="btn-logout">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{display: 'inline', marginRight: '8px'}}>
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Logout
          </button>
        </div>
      </div>
      <div className="dashboard-content">
        <Routes>
          <Route path="/" element={<DashboardOverview />} />
          <Route path="/profile" element={<ProfileManager />} />
          <Route path="/projects" element={<ProjectsManager />} />
          <Route path="/contacts" element={<ContactsManager />} />
          <Route path="/settings" element={<AdminSettings />} />
        </Routes>
      </div>
    </div>
  );
};

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    projects: 0,
    contacts: 0,
    views: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [projectsRes, contactsRes] = await Promise.all([
        API.get('/projects'),
        API.get('/contacts')
      ]);
      
      setStats({
        projects: projectsRes.data.pagination?.total || projectsRes.data.data.length,
        contacts: contactsRes.data.data.length,
        views: Math.floor(Math.random() * 1000) + 500
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div>
      <div className="dashboard-header">
        <h1>Dashboard Overview</h1>
        <p>Welcome back! Here's what's happening with your portfolio.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
          </div>
          <div className="stat-value">{stats.projects}</div>
          <div className="stat-label">Total Projects</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
          </div>
          <div className="stat-value">{stats.contacts}</div>
          <div className="stat-label">Contact Messages</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <div className="stat-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </div>
          </div>
          <div className="stat-value">{stats.views}</div>
          <div className="stat-label">Profile Views</div>
        </div>
      </div>

      <div className="recent-section">
        <h2>Quick Actions</h2>
        <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
          <Link to="/dashboard/profile" style={{textDecoration: 'none'}}>
            <button className="btn-primary">Update Profile</button>
          </Link>
          <Link to="/dashboard/projects" style={{textDecoration: 'none'}}>
            <button className="btn-primary">Manage Projects</button>
          </Link>
          <Link to="/dashboard/contacts" style={{textDecoration: 'none'}}>
            <button className="btn-primary">View Messages</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const ProfileManager = () => {
  const [profile, setProfile] = useState({ name: '', title: '', bio: '', resume_link: '' });
  const [modal, setModal] = useState({ isOpen: false, type: '', title: '', message: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data } = await API.get('/profile');
      if (data.data) {
        setProfile(data.data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.put('/profile', profile);
      setModal({
        isOpen: true,
        type: 'success',
        title: 'Success!',
        message: 'Profile updated successfully!'
      });
      fetchProfile();
    } catch (error) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Error',
        message: error.response?.data?.message || 'Failed to update profile. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="dashboard-header">
        <h1>Manage Profile</h1>
        <p>Update your portfolio information</p>
      </div>
      <form onSubmit={handleSubmit} className="form">
        <input type="text" placeholder="Name" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} required />
        <input type="text" placeholder="Title" value={profile.title} onChange={(e) => setProfile({...profile, title: e.target.value})} required />
        <textarea placeholder="Bio" value={profile.bio} onChange={(e) => setProfile({...profile, bio: e.target.value})} rows="5" />
        <input type="text" placeholder="Resume Link" value={profile.resume_link} onChange={(e) => setProfile({...profile, resume_link: e.target.value})} />
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
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

const ProjectsManager = () => {
  const [projects, setProjects] = useState([]);
  const [modal, setModal] = useState({ isOpen: false, type: '', title: '', message: '', onConfirm: null });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await API.get('/projects');
      setProjects(data.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const deleteProject = async (id) => {
    setModal({
      isOpen: true,
      type: 'confirm',
      title: 'Delete Project',
      message: 'Are you sure you want to delete this project? This action cannot be undone.',
      onConfirm: async () => {
        try {
          await API.delete(`/projects/${id}`);
          setModal({
            isOpen: true,
            type: 'success',
            title: 'Deleted!',
            message: 'Project deleted successfully.'
          });
          fetchProjects();
        } catch (error) {
          setModal({
            isOpen: true,
            type: 'error',
            title: 'Error',
            message: 'Failed to delete project. Please try again.'
          });
        }
      }
    });
  };

  return (
    <div>
      <div className="dashboard-header">
        <h1>Manage Projects</h1>
        <p>View and manage your portfolio projects</p>
      </div>
      <div className="projects-list">
        {projects.map(p => (
          <div key={p.id} className="project-item">
            <div>
              <h3>{p.title}</h3>
              <p style={{color: 'var(--text-secondary)', fontSize: '0.9rem'}}>{p.tech_stack}</p>
            </div>
            <button onClick={() => deleteProject(p.id)}>Delete</button>
          </div>
        ))}
      </div>
      <Modal
        isOpen={modal.isOpen}
        onClose={() => setModal({ ...modal, isOpen: false })}
        type={modal.type}
        title={modal.title}
        message={modal.message}
        onConfirm={modal.onConfirm}
        confirmText={modal.type === 'confirm' ? 'Delete' : 'OK'}
      />
    </div>
  );
};

const ContactsManager = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const { data } = await API.get('/contacts');
      setContacts(data.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  return (
    <div>
      <div className="dashboard-header">
        <h1>Contact Messages</h1>
        <p>View messages from your portfolio visitors</p>
      </div>
      <div className="contacts-list">
        {contacts.map(c => (
          <div key={c.id} className="contact-item">
            <div>
              <h3>{c.name} - {c.email}</h3>
              <p style={{color: 'var(--text-secondary)', marginTop: '0.5rem'}}>{c.message}</p>
            </div>
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
  const [modal, setModal] = useState({ isOpen: false, type: '', title: '', message: '' });
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

    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Password Mismatch',
        message: 'New passwords do not match. Please try again.'
      });
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

      setModal({
        isOpen: true,
        type: 'success',
        title: 'Success!',
        message: 'Your account settings have been updated successfully.'
      });
      
      setFormData({ ...formData, currentPassword: '', newPassword: '', confirmPassword: '' });
      
      const user = JSON.parse(localStorage.getItem('user'));
      user.username = formData.username;
      user.email = formData.email;
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      setModal({
        isOpen: true,
        type: 'error',
        title: 'Update Failed',
        message: error.response?.data?.message || 'Failed to update settings. Please check your current password and try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-settings">
      <div className="dashboard-header">
        <h1>Account Settings</h1>
        <p>Manage your account information and security</p>
      </div>
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
      </form>
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

export default Dashboard;
