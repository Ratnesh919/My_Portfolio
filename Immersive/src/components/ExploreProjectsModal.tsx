import React from "react";
import { projectsData, ProjectItem } from "../data/projectsData";
import "./styles/ExploreProjects.css";
import { MdClose, MdOpenInNew } from "react-icons/md";
import { FaGithub } from "react-icons/fa";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ExploreProjectsModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="explore-modal-overlay" onClick={onClose}>
      <div
        className="explore-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="explore-modal-header">
          <div>
            <h3>
              Live <span>Projects</span> & Work
            </h3>
            <div className="explore-modal-subtitle">
              Explore deployed applications, machine learning systems, and hardware repositories.
            </div>
          </div>
          <button
            className="explore-modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <MdClose />
          </button>
        </div>

        <div className="explore-modal-body">
          {projectsData.map((project: ProjectItem) => (
            <div key={project.id} className="explore-project-card">
              <div>
                <div className="project-card-top">
                  <span className="project-category-badge">
                    {project.category}
                  </span>
                </div>
                <h4 className="project-card-title">{project.title}</h4>
                <div className="project-card-tagline">{project.tagline}</div>
                <p className="project-card-desc">{project.description}</p>
                <div className="project-card-tech">
                  {project.tech.map((t, idx) => (
                    <span key={idx} className="tech-pill">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="project-card-actions">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-live-demo"
                  >
                    <MdOpenInNew size={16} /> Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-github-code"
                  >
                    <FaGithub size={16} /> Source Code
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreProjectsModal;
