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
          <h1>{profile?.name || 'Your Name'}</h1>
          <h2>{profile?.title || 'Full Stack Developer'}</h2>
          <p>{profile?.bio || 'Welcome to my portfolio'}</p>
          {profile?.resume_link && (
            <a href={profile.resume_link} download className="btn-primary">Download CV</a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
