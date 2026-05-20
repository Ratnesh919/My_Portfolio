import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My education <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Bachelor in Technology</h4>
                <h5>Swami Vivekananda Institute of Science & Technology</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              Under M.A.K.A.U.T. (W.B.U.T.). Specialization in Electronics And Communication Engineering.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>12th Standard</h4>
                <h5>P.B.S College (B.S.E.B)</h5>
              </div>
              <h3>2020</h3>
            </div>
            <p>
              Completed Higher Secondary Education in Science (P.C.M.).
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>10th Standard</h4>
                <h5>Vidyanjali High school (I.G.C.S.E)</h5>
              </div>
              <h3>2018</h3>
            </div>
            <p>
              Completed Secondary Education in Science.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
