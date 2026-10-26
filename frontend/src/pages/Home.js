import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../utils/api';
import './Home.css';

const roles = [
  'Full Stack Developer',
  'React.js Enthusiast',
  'Node.js Developer',
  'Problem Solver',
  'Clean Code Advocate',
];

const NAME = 'Firomsa Abdi';

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [displayedName, setDisplayedName] = useState('');
  const [isDeletingName, setIsDeletingName] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [contactStatus, setContactStatus] = useState(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  // Typewriter effect for roles
  useEffect(() => {
    const current = roles[roleIndex];
    let timeout;

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 45);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  // Typewriter effect for name
  useEffect(() => {
    const name = profile?.name || NAME;
    let timeout;

    if (!isDeletingName && displayedName.length < name.length) {
      timeout = setTimeout(() => setDisplayedName(name.slice(0, displayedName.length + 1)), 180);
    } else if (!isDeletingName && displayedName.length === name.length) {
      timeout = setTimeout(() => setIsDeletingName(true), 3000);
    } else if (isDeletingName && displayedName.length > 0) {
      timeout = setTimeout(() => setDisplayedName(name.slice(0, displayedName.length - 1)), 120);
    } else if (isDeletingName && displayedName.length === 0) {
      timeout = setTimeout(() => setIsDeletingName(false), 600);
    }

    return () => clearTimeout(timeout);
  }, [displayedName, isDeletingName, profile]);

  const fetchAllData = async () => {
    try {
      const [profileRes, projectsRes, skillsRes] = await Promise.all([
        API.get('/profile'),
        API.get('/projects?limit=6'),
        API.get('/skills')
      ]);
      setProfile(profileRes.data.data);
      setProjects(projectsRes.data.data);
      
      // Skills API returns categories with nested skills, flatten them
      const skillCategories = skillsRes.data.data || [];
      const flatSkills = skillCategories.flatMap(category => 
        category.skills.map(skill => ({
          ...skill,
          icon: category.icon,
          category: category.title
        }))
      );
      setSkills(flatSkills);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/contacts', contactForm);
      setContactStatus({ type: 'success', message: 'Thank you! I will get back to you soon.' });
      setContactForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setContactStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section id="hero" className="home">
        <div className="container">
          <div className="hero">
            {profile?.profile_image && (
              <div className="profile-pic-wrapper">
                <img src={profile.profile_image} alt={profile.name} className="profile-pic" />
              </div>
            )}
            <h2>{profile?.title || 'FULL STACK DEVELOPER'}</h2>
            <h1>Hi, I'm <span className="animated-name">{displayedName}<span className="name-cursor">|</span></span></h1>

            <div className="typewriter-wrapper">
              <span className="typewriter-text">{displayed}</span>
              <span className="typewriter-cursor">|</span>
            </div>

            <p className="hero-bio">{profile?.bio || "I build modern web applications from front to back — turning ideas into clean, scalable, and impactful digital experiences."}</p>

            <div className="hero-tags">
              <span>⚡ React.js</span>
              <span>🛠️ Node.js</span>
              <span>🗄️ MySQL</span>
              <span>🚀 Express</span>
            </div>

            <div className="hero-buttons">
              <a href="#projects" className="btn-primary">View My Work</a>
              <a href="#contact" className="btn-secondary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                Hire Me
              </a>
              {profile?.resume_link && (
                <a href={profile.resume_link} target="_blank" rel="noopener noreferrer" className="btn-outline">
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
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">About Me</span>
            <h2>Who I Am</h2>
          </div>
          
          <div className="about-content">
            <div className="about-text">
              <p className="about-intro">
                👋 Hello! I'm <span className="highlight">{profile?.name || 'Firomsa Abdi'}</span>, 
                a passionate full-stack developer who loves building meaningful digital experiences.
              </p>
              <p>
                {profile?.bio || "I design and develop modern web applications from front to back, combining clean UI design, powerful backend functionality, and efficient database management to create meaningful digital experiences."}
              </p>
            </div>

            {skills.length > 0 && (
              <div className="skills-grid">
                <h3>Technologies & Tools</h3>
                <div className="skills-list">
                  {skills.slice(0, 12).map((skill) => (
                    <div key={skill.id} className="skill-badge">
                      {skill.icon && <span className="skill-icon">{skill.icon}</span>}
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Portfolio</span>
            <h2>Featured Projects</h2>
            <p>Some of my recent work</p>
          </div>

          <div className="projects-grid">
            {projects.length === 0 ? (
              <p className="no-projects">No projects available yet.</p>
            ) : (
              projects.map((project) => (
                <div key={project.id} className="project-card">
                  {project.image_url && (
                    <div className="project-image">
                      <img src={project.image_url} alt={project.title} />
                    </div>
                  )}
                  <div className="project-content">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    {project.tech_stack && (
                      <div className="tech-stack">
                        {project.tech_stack.split(',').map((tech, i) => (
                          <span key={i}>{tech.trim()}</span>
                        ))}
                      </div>
                    )}
                    <div className="project-links">
                      {project.github_link && (
                        <a href={project.github_link} target="_blank" rel="noopener noreferrer">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                          Code
                        </a>
                      )}
                      {project.live_link && (
                        <a href={project.live_link} target="_blank" rel="noopener noreferrer" className="live-link">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/>
                          </svg>
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="view-all-projects">
            <Link to="/projects" className="btn-outline">View All Projects</Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Get In Touch</span>
            <h2>Let's Work Together</h2>
            <p>Have a project in mind? Let's talk about it.</p>
          </div>

          <div className="contact-wrapper">
            <div className="contact-info-cards">
              <div className="contact-info-card">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <h3>Email</h3>
                <p>naniabdi2504@gmail.com</p>
              </div>

              <div className="contact-info-card">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                <h3>Location</h3>
                <p>Ethiopia, DD</p>
              </div>

              <div className="contact-info-card">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <h3>Phone</h3>
                <p>+251925045213</p>
              </div>
            </div>

            <form onSubmit={handleContactSubmit} className="contact-form-inline">
              <div className="form-row">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  required
                />
              </div>
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                value={contactForm.subject}
                onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
              />
              <textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                required
              />
              <button type="submit" className="btn-primary">Send Message</button>
              
              {contactStatus && (
                <div className={`contact-status ${contactStatus.type}`}>
                  {contactStatus.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
