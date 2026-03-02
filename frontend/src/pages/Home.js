import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';
import './Home.css';

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

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
          <h2>{profile?.title || 'FULL-STACK DEVELOPER AND GRAPHIC DESIGNER'}</h2>
          <h1>Hi, I'm <span>{profile?.name || 'FIROMSA ABDI'}</span></h1>
          <p>{profile?.bio || 'I’m a full-stack developer and graphic designer passionate about building scalable web applications with clean, intuitive design. I bring together strong backend development, modern frontend technologies, and visual creativity to create digital products that are both powerful and user-focused.'}</p>
          <div className="hero-buttons">
            <Link to="/projects" className="btn-primary">View My Work</Link>
            {profile?.resume_link && (
              <a href={profile.resume_link} target="_blank" rel="noopener noreferrer" className="btn-secondary">
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
