import { useState } from "react";
import PropTypes from "prop-types";
import './Login.css';

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
    <div className="login-container">
      <div className="login-form transparent-bg">
        <h2>Welcome Back</h2>
        <p className="subtitle">Please login to your account</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="input-field"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="input-field"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn">
            Login
          </button>
        </form>
        <div className="extra-links">
          <a href="#" className="forgot-password">Forgot password?</a>
          <span className="no-account">
            No account? <span onClick={() => handleNavigation("registration")} className="signup-link">Sign Up</span>
          </span>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
    navigate: PropTypes.func.isRequired,
};

export default Login;
