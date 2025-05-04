import { FaFacebook, FaLinkedin, FaGithub } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="main-footer">
        <div className="footer-container">
            <div className="footer-content">
            <div className="footer-brand">
                <h3 className="footer-logo">OptiChain</h3>
                <p className="footer-description">
                AI-powered supply chain optimization for SMEs
                <br />
                Dhaka, Bangladesh
                </p>
            </div>
            
            <div className="footer-social">
                <h4 className="social-title">Connect with us</h4>
                <div className="social-icons">
                <a href="https://www.facebook.com/himel.s.hossain" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <FaFacebook />
                </a>
                <a href="https://www.linkedin.com/in/sazzad-hossen-6205392a3" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <FaLinkedin />
                </a>
                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="social-icon">
                    <FaGithub />
                </a>
                </div>
            </div>
            </div>
            
            <div className="footer-copyright">
            <p>&copy; {new Date().getFullYear()} OptiChain. All rights reserved.</p>
            </div>
        </div>
        </footer>
    );
};

export default Footer;