import React from "react";
import './Section.css';
import Fade from 'react-reveal/Fade';

const Section = ({ title, description, buttonText, imageSrc, onClick }) => {
  return (
    <div className="mainContainer">
      <div className="container">
        <div className="section1">
          <h2>{title}</h2>
          <Fade left>
            <p className="paragraph">{description}</p>
          </Fade>
          <button className="btnDark" onClick={onClick}>
            {buttonText}
            <div className="icon">
            <span class="material-symbols-outlined">
            arrow_right_alt
            </span>
            </div>
          </button>
        </div>
        <div className="img">
        <Fade right>
          <img
            src={imageSrc}
            alt="team"
            style={{
              width: '35vw',
              padding: '0 20px 0 20px',
              border: '2px solid #ccc',
              borderRadius: '8px',
            }}
          />
          </Fade>
        </div>
      </div>
    </div>
  );
};

export default Section;
