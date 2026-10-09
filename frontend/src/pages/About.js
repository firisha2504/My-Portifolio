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
            <p>I’m a full-stack developer with over five years of experience building web applications that are fast, accessible, and scalable. I specialize in the JavaScript ecosystem, working with React on the frontend and Node.js on the backend, while applying strong design principles to create clean, user-focused interfaces.

Beyond development, I’m passionate about visual design and crafting digital experiences that balance performance with aesthetics. When I’m not coding or designing, you’ll find me exploring new technologies, contributing to open-source projects, or writing technical articles. I believe in continuous learning and sharing knowledge with the community.</p>
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
