import React, { useState, useEffect } from 'react';
import API from '../utils/api';
import './About.css';

const About = () => {
  const [skillCategories, setSkillCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const { data } = await API.get('/skills');
      if (data.success) {
        // Transform API data to match component structure
        const formattedSkills = data.data.map(category => ({
          title: category.title,
          icon: category.icon,
          skills: category.skills.map(skill => skill.name)
        }));
        setSkillCategories(formattedSkills);
      }
    } catch (error) {
      console.error('Error fetching skills:', error);
      // Fallback to default skills if API fails
      setSkillCategories([
        {
          title: 'Frontend',
          icon: '💻',
          skills: ['React.js', 'TypeScript', 'Tailwind CSS', 'Next.js']
        },
        {
          title: 'Backend',
          icon: '⚙️',
          skills: ['Node.js', 'Express', 'REST APIs', 'GraphQL']
        },
        {
          title: 'Database',
          icon: '🗄️',
          skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis']
        },
        {
          title: 'DevOps',
          icon: '🚀',
          skills: ['Docker', 'CI/CD', 'AWS', 'Linux']
        },
        {
          title: 'Mobile',
          icon: '📱',
          skills: ['React Native', 'PWA', 'Responsive Design']
        },
        {
          title: 'Tools',
          icon: '🛠️',
          skills: ['Git', 'VS Code', 'Figma', 'Postman']
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="about">
      <div className="container">
        <div className="about-header">
          <h1>About Me</h1>
          <p className="about-subtitle">Passionate developer with a love for building impactful digital experiences.</p>
        </div>
        
        <section className="about-content">
          <div className="about-text">
            <div className="about-greeting">
              <span className="greeting-badge">👋 Nice to meet you</span>
            </div>
            <h2 className="about-name">I'm <span className="highlight">Firomsa Abdi</span></h2>
            <h3 className="about-role">Full Stack Developer & Problem Solver</h3>

            <p>
              I turn ideas into reality through clean code and modern web technologies.
              Passionate about crafting seamless digital experiences — from pixel-perfect frontends
              to powerful backend systems that scale.
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
          </div>
        </section>

        <section className="skills-section">
          <h2>Skills & Technologies</h2>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
              <p>Loading skills...</p>
            </div>
          ) : (
            <div className="skills-categories">
              {skillCategories.map((category, index) => (
                <div key={index} className="skill-category">
                  <div className="category-header">
                    <span className="category-icon">{category.icon}</span>
                    <h3>{category.title}</h3>
                  </div>
                  <div className="category-skills">
                    {category.skills.map((skill, i) => (
                      <span key={i} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default About;
