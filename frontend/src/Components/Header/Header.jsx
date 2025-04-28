import React from 'react';
import './Header.css';

const Header = ({ navigate }) => {

  const handleNavigation = (page) => {
    navigate(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="header container">
      <div className='header-text'>
        <h1><span className="highlight">OptiChain</span></h1>
        <p>
          AI-powered supply chain optimization for SMEs. Affordable. Scalable. Smart.
        </p>
        <button onClick={() => handleNavigation("login")} className='btn'>
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Header;
