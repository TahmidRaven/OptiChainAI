import React, { useState } from 'react';
import './Registration.css';

const Registration = ({ navigate }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Registering user:', { name, email, password });
    };

    const handleNavigation = (page) => {
        navigate(page);
        window.scrollTo(0, 0);
      };

    return (
        <div className="login-container">
        <div className="login-form transparent-bg">
            <h2>Create Account</h2>
            <p className="subtitle">Please fill in the details to register</p>
            <form onSubmit={handleSubmit}>
            <input
                type="text"
                className="input-field"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
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
                Register
            </button>
            </form>
            <div className="extra-links">
            <span className="no-account">
                Alreay have an account? <span onClick={() => handleNavigation("login")} className="signup-link">Login</span>
            </span>
            </div>
        </div>
        </div>
    );
};

export default Registration;
