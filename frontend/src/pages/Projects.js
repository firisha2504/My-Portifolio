import React, { useState, useEffect } from 'react';
import API from '../utils/api';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    fetchProjects();
  }, [page]);

  const fetchProjects = async () => {
    try {
      const { data } = await API.get(`/projects?page=${page}&limit=6`);
      setProjects(data.data);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="projects">
      <div className="container">
        <h1>My Projects</h1>
        <p className="projects-subtitle">A selection of recent work showcasing my skills and experience.</p>
        <div className="projects-grid">
          {projects.map((project) => (
            <div key={project.id} className="project-card">
              {project.image_url && <img src={project.image_url} alt={project.title} />}
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tech-stack">
                {project.tech_stack && project.tech_stack.split(',').map((tech, i) => (
                  <span key={i}>{tech.trim()}</span>
                ))}
              </div>
              <div className="project-links">
                {project.github_link && <a href={project.github_link} target="_blank" rel="noopener noreferrer">Code</a>}
                {project.live_link && <a href={project.live_link} target="_blank" rel="noopener noreferrer">Live Demo</a>}
              </div>
            </div>
          ))}
        </div>
        {pagination.pages > 1 && (
          <div className="pagination">
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Previous</button>
            <span>Page {page} of {pagination.pages}</span>
            <button onClick={() => setPage(p => p + 1)} disabled={page === pagination.pages}>Next</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
