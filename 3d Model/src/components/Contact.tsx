import { MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a href="mailto:kumarsinghratnesh3@gmail.com" data-cursor="disable">
                kumarsinghratnesh3@gmail.com
              </a>
            </p>
            <h4>Socials</h4>
            <p>
              <a href="https://www.facebook.com/share/1De11Vypsn/" target="_blank" rel="noreferrer" data-cursor="disable" className="contact-social">
                Facebook
              </a>
            </p>
            <h4>Education</h4>
            <p>B.Tech in Electronics & Communication</p>
          </div>
          <div className="contact-box">
            <h4>Languages Known</h4>
            <span className="contact-social">English</span>
            <br />
            <span className="contact-social">Hindi</span>
            <br />
            <span className="contact-social">Bengali</span>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Ratnesh Kumar Singh</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
