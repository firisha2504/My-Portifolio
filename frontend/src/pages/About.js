import React from 'react';
import './About.css';

const About = () => {
  const skills = [
    { name: 'React', level: 90 },
    { name: 'Node.js', level: 85 },
    { name: 'Express', level: 88 },
    { name: 'MySQL', level: 80 },
    { name: 'JavaScript', level: 92 },
    { name: 'HTML/CSS', level: 95 },
    { name: 'Git', level: 85 },
    { name: 'REST APIs', level: 88 }
  ];

  return (
    <div className="about">
      <div className="container">
        <h1>About Me</h1>
        <p className="about-subtitle">Get to know me better</p>
        
        <section className="about-content">
          <div className="about-text">
            <h2>Who I Am</h2>
            <p>I'm a passionate full-stack developer with expertise in building modern, scalable web applications. With a strong foundation in both frontend and backend technologies, I create seamless digital experiences that solve real-world problems.</p>
            <p>My journey in web development started with a curiosity about how things work on the internet, and it has evolved into a career where I get to build amazing products every day.</p>
          </div>
          
          <div className="about-stats">
            <div className="stat-card">
              <h3>5+</h3>
              <p>Years Experience</p>
            </div>
            <div className="stat-card">
              <h3>50+</h3>
              <p>Projects Completed</p>
            </div>
            <div className="stat-card">
              <h3>30+</h3>
              <p>Happy Clients</p>
            </div>
          </div>
        </section>

        <section className="skills">
          <h2>Skills & Expertise</h2>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div key={index} className="skill-item">
                <div className="skill-header">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-percentage">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <div className="skill-progress" style={{ width: `${skill.level}%` }}></div>
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
