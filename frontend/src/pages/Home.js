import React, { useState, useEffect } from 'react';
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
            <img src={profile.profile_image} alt={profile.name} className="profile-pic" />
          )}
          <h2>{profile?.title || 'FULL-STACK DEVELOPER'}</h2>
          <h1>Hi, I'm <span>{profile?.name || 'Your Name'}</span></h1>
          <p>{profile?.bio || 'I craft elegant, scalable web applications with modern technologies. Passionate about clean code, great UX, and solving real-world problems.'}</p>
          {profile?.resume_link && (
            <a href={profile.resume_link} download className="btn-primary">Download CV</a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
