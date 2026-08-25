import { useState, useCallback } from "react";
import "./styles/Work.css";
import { MdArrowBack, MdArrowForward, MdOpenInNew } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { projectsData } from "../data/projectsData";
import ExploreProjectsModal from "./ExploreProjectsModal";

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projectsData.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projectsData.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <div className="work-header-flex">
          <h2>
            My <span>Projects</span>
          </h2>
          <button
            className="explore-work-btn"
            onClick={() => setIsModalOpen(true)}
            data-cursor="disable"
          >
            Explore My Work →
          </button>
        </div>

        <div className="carousel-wrapper">
          {/* Navigation Arrows */}
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          {/* Slides */}
          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {projectsData.map((project, index) => (
                <div className="carousel-slide" key={project.id || index}>
                  <div className="carousel-content text-only-content">
                    <div className="carousel-info text-only-info">
                      <div className="carousel-number text-only-number">
                        <h3>0{index + 1}</h3>
                      </div>
                      <div className="carousel-details text-only-details">
                        <h4>{project.title}</h4>
                        <p className="carousel-category">
                          {project.category}
                        </p>
                        <p className="carousel-tagline-text">
                          {project.description}
                        </p>
                        <div className="carousel-tools">
                          <span className="tools-label">Tech Stack & Tools</span>
                          <div className="carousel-tech-pills">
                            {project.tech.map((t, idx) => (
                              <span key={idx} className="tech-badge">{t}</span>
                            ))}
                          </div>
                        </div>

                        {/* Project Actions */}
                        <div className="carousel-project-actions">
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-slide-live"
                              data-cursor="disable"
                            >
                              <MdOpenInNew size={15} /> Live Demo
                            </a>
                          )}
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-slide-github"
                              data-cursor="disable"
                            >
                              <FaGithub size={15} /> GitHub Repo
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="carousel-dots">
            {projectsData.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${
                  index === currentIndex ? "carousel-dot-active" : ""
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Modal */}
      <ExploreProjectsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Work;
