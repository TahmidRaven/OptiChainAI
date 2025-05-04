
import React from 'react';
import './Header.css';
// import heroImage from '../../assets/heroImage.jpg';
import Ai_robot from '../../assets/Ai_robot.png';
import Manu from '../../assets/manu.png';

const Header = () => {

  return (
    <div className="main-header-container">
      <div className="main-header-content container">
        <div className="main-header-left">
          <div className="main-brand-section">
            <h1 className="main-brand-name">OptiChain</h1>
            <p className="main-brand-description">
              AI-powered supply chain optimization for SMEs. <br />
              Affordable, scalable solutions to transform your logistics.
            </p>
          </div>
          <div className="main-robot-container">
            <img src={Ai_robot} alt="AI Robot Assistant" className="main-ai-logo" />
          </div>
        </div>
        
        <div className="main-header-right">
          <img src={Manu} alt="AI Technology" className="main-robot-image" />
        </div>
      </div>
    </div>
  );
};

export default Header;