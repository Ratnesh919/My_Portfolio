import { useState } from "react";
import "./styles/Certificates.css";

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  instructor: string;
  date: string;
  certId: string;
  image: string;
  verifyUrl: string;
}

const certificatesData: Certificate[] = [
  {
    id: "cert-iot",
    title: "Internet of Things (IoT) Online Course",
    issuer: "Udemy",
    instructor: "Makeintern Course, Learntoupgrade Online",
    date: "July 30, 2026",
    certId: "UC-45f867df-23bf-440a-b362-0508bfb8d29f",
    image: "./certificates/cert-iot.jpg",
    verifyUrl: "https://ude.my/UC-45f867df-23bf-440a-b362-0508bfb8d29f",
  },
  {
    id: "cert-prompt-engineering",
    title: "Prompt Engineering for Everyone (Tool-Agnostic)",
    issuer: "Udemy",
    instructor: "Dr. Amar Massoud",
    date: "May 4, 2025",
    certId: "UC-58952f65-94dc-45c4-abd9-aa490de18afc",
    image: "./certificates/cert-prompt-engineering.jpg",
    verifyUrl: "https://ude.my/UC-58952f65-94dc-45c4-abd9-aa490de18afc",
  },
  {
    id: "cert-multi-programming",
    title: "Master Java, Python, C & C++: All-in-One Programming Course",
    issuer: "Udemy",
    instructor: "Knowledge Nest",
    date: "May 5, 2025",
    certId: "UC-a51ac130-1bc3-41dc-97d0-84e611b49d3b",
    image: "./certificates/cert-multi-programming.jpg",
    verifyUrl: "https://ude.my/UC-a51ac130-1bc3-41dc-97d0-84e611b49d3b",
  },
  {
    id: "cert-cpp",
    title: "The Complete Introduction to C++ Programming",
    issuer: "Udemy",
    instructor: "Yassin Marco MBA",
    date: "July 14, 2025",
    certId: "UC-c57ec369-5a17-48e6-a9be-bcf9c0855867",
    image: "./certificates/cert-cpp.jpg",
    verifyUrl: "https://ude.my/UC-c57ec369-5a17-48e6-a9be-bcf9c0855867",
  },
];

const Certificates = () => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  return (
    <div className="certificates-section section-container" id="certificates">
      <div className="certificates-container">
        <h2>
          Licenses <span>&</span>
          <br /> Certifications
        </h2>
        <p className="certificates-subtitle">
          Verified credentials and specialized technical course completions
        </p>

        <div className="certificates-grid">
          {certificatesData.map((cert) => (
            <div key={cert.id} className="certificate-card">
              <div
                className="certificate-image-wrapper"
                onClick={() => setSelectedCert(cert)}
              >
                <img
                  src={cert.image}
                  alt={cert.title}
                  loading="lazy"
                  className="certificate-img"
                />
                <div className="certificate-overlay">
                  <span>🔍 View Full Certificate</span>
                </div>
              </div>

              <div className="certificate-content">
                <div className="certificate-badge-row">
                  <span className="cert-issuer-badge">{cert.issuer}</span>
                  <span className="cert-date-badge">{cert.date}</span>
                </div>

                <h3 className="certificate-title">{cert.title}</h3>
                <p className="certificate-instructor">By {cert.instructor}</p>
                <p className="certificate-id">ID: {cert.certId}</p>

                <div className="certificate-actions">
                  <button
                    className="cert-btn-preview"
                    onClick={() => setSelectedCert(cert)}
                  >
                    Preview
                  </button>
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-btn-verify"
                  >
                    Verify ↗
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedCert && (
        <div
          className="cert-modal-backdrop"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="cert-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="cert-modal-close"
              onClick={() => setSelectedCert(null)}
            >
              ✕
            </button>
            <div className="cert-modal-header">
              <h3>{selectedCert.title}</h3>
              <p>
                {selectedCert.issuer} &bull; {selectedCert.date} &bull; ID:{" "}
                {selectedCert.certId}
              </p>
            </div>
            <div className="cert-modal-body">
              <img
                src={selectedCert.image}
                alt={selectedCert.title}
                className="cert-modal-img"
              />
            </div>
            <div className="cert-modal-footer">
              <a
                href={selectedCert.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cert-btn-verify-modal"
              >
                Verify on Udemy ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificates;
