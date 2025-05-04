import React, { useState, useEffect } from 'react';
import './Navbar.css';
import PropTypes from "prop-types";
import logo from '../../assets/Logo.svg';

const Navbar = ({ navigate }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    // const [darkMode, setDarkMode] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleNavigation = (page) => {
        navigate(page);
        window.scrollTo(0, 0);
    };

    // const toggleDarkMode = () => {
    //     const newMode = !darkMode;
    //     setDarkMode(newMode);
    //     localStorage.setItem('darkMode', newMode);
    //     document.documentElement.setAttribute('data-theme', newMode ? 'dark' : 'light');
    // };

    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode') === 'true';
        // setDarkMode(savedMode);
        document.documentElement.setAttribute('data-theme', savedMode ? 'dark' : 'light');
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['home', 'about', 'contact'];
            const scrollY = window.scrollY;

            for (const sectionId of sections) {
                const section = document.getElementById(sectionId);
                if (section && section.offsetTop <= scrollY + 120) {
                    setActiveSection(sectionId);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className="header container">
            <div className="header-left">
                <div className="logo-container">
                    <img 
                        src={logo} 
                        alt="SalesRank.Ai Logo" 
                        className="logo-img" 
                    />
                </div>
                <button className="mobile-menu-button" onClick={toggleMenu} aria-label="Toggle menu">
                    <span className={`bar ${isMenuOpen ? 'open' : ''}`}></span>
                    <span className={`bar ${isMenuOpen ? 'open' : ''}`}></span>
                    <span className={`bar ${isMenuOpen ? 'open' : ''}`}></span>
                </button>
                <nav className={`navigation ${isMenuOpen ? 'open' : ''}`}>
                    <ul>
                        <li><a onClick={() => handleNavigation("home")} className={activeSection === "home" ? "active" : ""}>Home</a></li>
                        <li><a onClick={() => handleNavigation("about")} className={activeSection === "about" ? "active" : ""}>About</a></li>
                        <li><a onClick={() => handleNavigation("contact")} className={activeSection === "contact" ? "active" : ""}>Contact</a></li>
                    </ul>
                </nav>
            </div>
            <div className="header-right">
                {/* <button 
                    className="dark-mode-toggle" 
                    onClick={toggleDarkMode}
                    aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                    {darkMode ? (
                        <span className="dark-mode-icon">☀️</span>
                    ) : (
                        <span className="dark-mode-icon">🌙</span>
                    )}
                </button> */}
                <button onClick={() => handleNavigation("login")} className="get-started-btn">Log In</button>
            </div>
        </header>
    );
};

Navbar.propTypes = {
    navigate: PropTypes.func.isRequired,
};

export default Navbar;