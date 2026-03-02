import React from 'react';
import './About.css';

const About = () => {
  const skillCategories = [
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
  ];

  return (
    <div className="about">
      <div className="container">
        <div className="about-header">
          <h1>About Me</h1>
          <p className="about-subtitle">Passionate developer with a love for building impactful digital experiences.</p>
        </div>
        
        <section className="about-content">
          <div className="about-text">
            <p>I'm a full-stack developer with over 5 years of experience building web applications that are fast, accessible, and scalable. I specialize in the JavaScript ecosystem, working with React on the frontend and Node.js on the backend.</p>
            <p>When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or writing technical articles. I believe in continuous learning and sharing knowledge with the community.</p>
          </div>
        </section>

        <section className="skills-section">
          <h2>Skills & Technologies</h2>
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
        </section>
      </div>
    </div>
  );
};

export default About;
