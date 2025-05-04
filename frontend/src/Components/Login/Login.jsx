import { useState } from "react";
import PropTypes from "prop-types";
import './Login.css';
import robotIcon from '../../assets/Ai_robot.png';

const Login = ({ navigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in with:', { email, password });
  };

  const handleNavigation = (page) => {
    navigate(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="login-main-container">
      <div className="login-content-container">
        <div className="login-left-section">
          <div className="login-brand-section">
            <h1 className="login-brand-name">OptiChain</h1>
            <p className="login-brand-description">
              AI-powered supply chain optimization platform
            </p>
          </div>
          <img 
            src={robotIcon} 
            alt="AI Assistant" 
            className="login-robot-image" 
          />
        </div>
        
        <div className="login-right-section">
          <div className="login-form-container">
            <h2 className="login-title">Welcome Back</h2>
            <p className="login-subtitle">Sign in to continue to your account</p>
            
            <form onSubmit={handleSubmit} className="login-form">
              <div className="input-group">
                <input
                  type="email"
                  className="login-input"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="input-group">
                <input
                  type="password"
                  className="login-input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <button type="submit" className="login-btn">
                Login
                <span className="btn-arrow">→</span>
              </button>
            </form>
            
            <div className="login-footer">
              <a href="#" className="forgot-password">Forgot password?</a>
              <span className="no-account">
                Don't have an account?{' '}
                <span 
                  onClick={() => handleNavigation("registration")} 
                  className="signup-link"
                >
                  Sign Up
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  navigate: PropTypes.func.isRequired,
};

export default Login;