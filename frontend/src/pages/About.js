import React from 'react';
import './About.css';

const About = () => {
  const skills = ['React', 'Node.js', 'Express', 'MySQL', 'JavaScript', 'HTML/CSS', 'Git', 'REST APIs'];

  return (
    <div className="about">
      <div className="container">
        <h1>About Me</h1>
        <section className="about-content">
          <p>I'm a passionate full-stack developer with expertise in building modern web applications.</p>
        </section>
        <section className="skills">
          <h2>Skills</h2>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div key={index} className="skill-card">{skill}</div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
