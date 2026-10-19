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
            <p>
I'm a passionate Full-Stack Developer who enjoys building practical solutions through clean code, thoughtful design, and modern web technologies.

Using the MERN stack, I develop responsive frontend experiences, robust backend APIs, and database-driven applications that solve real-world problems. I value continuous learning, collaboration, and writing maintainable code.

I'm looking for an opportunity to contribute my skills, grow alongside experienced developers, and help build products that make a meaningful impact.</p>
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
