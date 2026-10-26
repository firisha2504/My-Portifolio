import React, { useState, useEffect } from 'react';
import API from '../utils/api';
import './About.css';

const About = () => {
  const [profile, setProfile] = useState(null);
  const [skillCategories, setSkillCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [profileRes, skillsRes] = await Promise.all([
        API.get('/profile'),
        API.get('/skills')
      ]);
      
      setProfile(profileRes.data.data);
      
      // Skills API returns grouped by category
      if (skillsRes.data.success && skillsRes.data.data) {
        setSkillCategories(skillsRes.data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="about">
      <div className="container">
        <div className="about-header">
          <span className="section-badge">About Me</span>
          <h1>Who I Am</h1>
          <p className="about-subtitle">Passionate developer with a love for building impactful digital experiences</p>
        </div>
        
        <section className="about-content">
          <div className="about-intro-section">
            <div className="about-text">
              <div className="about-greeting">
                <span className="greeting-badge">👋 Nice to meet you</span>
              </div>
              <h2 className="about-name">
                I'm <span className="highlight">{profile?.name || 'Firomsa Abdi'}</span>
              </h2>
              <h3 className="about-role">{profile?.title || 'Full Stack Developer & Problem Solver'}</h3>

              <p>
                {profile?.bio || "I design and develop modern web applications from front to back, combining clean UI design, powerful backend functionality, and efficient database management to create meaningful digital experiences."}
              </p>
              <p>
                With the <span className="tech-highlight">MERN stack</span> as my core toolkit,
                I build responsive, database-driven applications that solve real-world problems.
                I believe great software is built at the intersection of technical excellence and
                human-centered design.
              </p>
              <p>
                Currently seeking opportunities to contribute, collaborate, and build products that
                make a <span className="tech-highlight">meaningful impact</span>.
              </p>
            </div>

            {profile?.profile_image && (
              <div className="about-image-wrapper">
                <img src={profile.profile_image} alt={profile.name} className="about-profile-image" />
              </div>
            )}
          </div>

          <div className="about-highlights">
            <div className="highlight-item">
              <span className="highlight-icon">🚀</span>
              <div>
                <strong>Fast Learner</strong>
                <p>Adapts quickly to new technologies and challenges</p>
              </div>
            </div>
            <div className="highlight-item">
              <span className="highlight-icon">💡</span>
              <div>
                <strong>Problem Solver</strong>
                <p>Breaks down complex problems into elegant solutions</p>
              </div>
            </div>
            <div className="highlight-item">
              <span className="highlight-icon">🤝</span>
              <div>
                <strong>Team Player</strong>
                <p>Thrives in collaborative, agile environments</p>
              </div>
            </div>
            <div className="highlight-item">
              <span className="highlight-icon">✨</span>
              <div>
                <strong>Detail Oriented</strong>
                <p>Cares about code quality and clean architecture</p>
              </div>
            </div>
          </div>
        </section>

        <section className="skills-section">
          <h2>Skills & Technologies</h2>
          <p className="skills-subtitle">Tools and technologies I work with</p>
          
          {skillCategories.length > 0 ? (
            <div className="skills-categories">
              {skillCategories.map((category, index) => (
                <div key={index} className="skill-category">
                  <div className="category-header">
                    <span className="category-icon">{category.icon || '📌'}</span>
                    <h3>{category.title}</h3>
                  </div>
                  <div className="category-skills">
                    {category.skills.map((skill) => (
                      <span key={skill.id} className="skill-tag">{skill.name}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-skills">
              <p>No skills data available</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default About;
