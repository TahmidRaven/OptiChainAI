import './Footer.css';
import { FaFacebook, FaLinkedin, FaGithub } from 'react-icons/fa';
import PropTypes from 'prop-types';

const Footer = () => {

    return (
        <footer>
            <div className="container footer">
                <div className="footer-column">
                    <p>AI-powered supply chain optimization for SMEs
                      <br/> Dhaka, Bangladesh
                    </p>
                </div>
                <div className="footer-column socials-column">
                    <p>Connect me:</p>
                    <div className="footer-socials">
                        <a href="https://www.facebook.com/himel.s.hossain" target="_blank" rel="noopener noreferrer">
                            <FaFacebook />
                        </a>
                        <a href="https://www.linkedin.com/in/sazzad-hossen-6205392a3" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin />
                        </a>
                    </div>
                </div>
            </div>
            <div className="footer-copyright">
                <p>&copy; Optichain {new Date().getFullYear()} - All Rights Reserved.</p>
            </div>
        </footer>
    );
};

Footer.propTypes = {
    navigate: PropTypes.func.isRequired,
};

export default Footer;
