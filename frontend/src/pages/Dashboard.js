import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import API from '../utils/api';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
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
          <button onClick={handleLogout} className="btn-primary">Logout</button>
        </nav>
      </div>
      <div className="dashboard-content">
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/profile" element={<ProfileManager />} />
          <Route path="/projects" element={<ProjectsManager />} />
          <Route path="/contacts" element={<ContactsManager />} />
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

export default Dashboard;
