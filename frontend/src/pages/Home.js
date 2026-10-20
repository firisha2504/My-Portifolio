import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';
import './Home.css';

const roles = [
  'Full Stack Developer',
  'React.js Enthusiast',
  'Node.js Developer',
  'Problem Solver',
  'Clean Code Advocate',
];

const NAME = 'Firomsa Abdi';

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayedName, setDisplayedName] = useState('');
  const [isDeletingName, setIsDeletingName] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  // Typewriter effect for roles
  useEffect(() => {
    const current = roles[roleIndex];
    let timeout;

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 45);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  // Typewriter effect for name
  useEffect(() => {
    const name = profile?.name || NAME;
    let timeout;

    if (!isDeletingName && displayedName.length < name.length) {
      timeout = setTimeout(() => setDisplayedName(name.slice(0, displayedName.length + 1)), 100);
    } else if (!isDeletingName && displayedName.length === name.length) {
      timeout = setTimeout(() => setIsDeletingName(true), 2500);
    } else if (isDeletingName && displayedName.length > 0) {
      timeout = setTimeout(() => setDisplayedName(name.slice(0, displayedName.length - 1)), 60);
    } else if (isDeletingName && displayedName.length === 0) {
      timeout = setTimeout(() => setIsDeletingName(false), 400);
    }

    return () => clearTimeout(timeout);
  }, [displayedName, isDeletingName, profile]);

  const fetchProfile = async () => {
    try {
      const { data } = await API.get('/profile');
      setProfile(data.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="home">
      <div className="container">
        <div className="hero">
          {profile?.profile_image && (
            <div className="profile-pic-wrapper">
              <img src={profile.profile_image} alt={profile.name} className="profile-pic" />
            </div>
          )}
          <h2>{profile?.title || 'FULL STACK DEVELOPER'}</h2>
          <h1>Hi, I'm <span className="animated-name">{displayedName}<span className="name-cursor">|</span></span></h1>

          <div className="typewriter-wrapper">
            <span className="typewriter-text">{displayed}</span>
            <span className="typewriter-cursor">|</span>
          </div>

          <p className="hero-bio">{profile?.bio || "I build modern web applications from front to back — turning ideas into clean, scalable, and impactful digital experiences."}</p>

          <div className="hero-tags">
            <span>⚡ React.js</span>
            <span>🛠️ Node.js</span>
            <span>🗄️ MySQL</span>
            <span>🚀 Express</span>
          </div>

          <div className="hero-buttons">
            <Link to="/projects" className="btn-primary">View My Work</Link>
            <Link to="/contact" className="btn-secondary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              Hire Me
            </Link>
            {profile?.resume_link && (
              <a href={profile.resume_link} target="_blank" rel="noopener noreferrer" className="btn-outline">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
                </svg>
                Download CV
              </a>
            )}
          </div>
        </div>

        <div className="home-stats">
          <div className="home-stat-card">
            <div className="stat-number">5+</div>
            <div className="stat-text">Years Experience</div>
          </div>
          <div className="home-stat-card">
            <div className="stat-number">30+</div>
            <div className="stat-text">Projects Completed</div>
          </div>
          <div className="home-stat-card">
            <div className="stat-number">15+</div>
            <div className="stat-text">Happy Clients</div>
          </div>
          <div className="home-stat-card">
            <div className="stat-number">10+</div>
            <div className="stat-text">Technologies</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
