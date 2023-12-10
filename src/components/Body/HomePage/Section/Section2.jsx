import React from "react";
import './Section2.css';
import AddImg from '/Add.png';
import Fade from 'react-reveal/Fade';

const Section2 = ({ title, description, buttonText, imageSrc, onClick }) => {
  return (
    <div className="mainContainer">
      <div className="container2">
        <div className="img">
        <Fade left>
          <img
            src={imageSrc}
            alt="add"
            style={{
              width: '35vw',
              padding: '0 20px 0 20px',
              border: '2px solid #ccc',
              borderRadius: '8px',
            }}
          />
          </Fade>
        </div>
        <div className="section2">
          <h2>{title}</h2>
          <Fade right>
          <p className="paragraph2">{description}</p>
          </Fade>
          <button className="btnDark2" onClick={onClick}>
            {buttonText}
            <div className="icon2">
              <i className="fas fa-arrow-right"></i>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Section2;
