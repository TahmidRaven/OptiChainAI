import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import logo from "../../assets/Logo.svg";
import "./Navbar.css";

const Navbar = ({ navigate }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    const handleNavigation = (page) => {
        closeMenu();
        navigate(page);
        window.scrollTo(0, 0);
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    useEffect(() => {
        const savedMode = localStorage.getItem("darkMode") === "true";
        setDarkMode(savedMode);
    }, []);

    useEffect(() => {
        localStorage.setItem("darkMode", darkMode);
        if (darkMode) {
        document.documentElement.setAttribute("data-theme", "dark");
        } else {
        document.documentElement.setAttribute("data-theme", "light");
        }
    }, [darkMode]);

    return (
        <nav className="navbar container">
        <div onClick={() => handleNavigation("home")}>
          <img src={logo} alt="Logo" className="event-logo" onClick={() => handleNavigation("home")}/>
        </div>
        <div className="dark-mode-toggle-wrapper" onClick={toggleDarkMode}>
            <div className={`dark-mode-toggle ${darkMode ? "dark" : "light"}`}>
                {darkMode ? "☀️" : "🌙"}
            </div>
        </div>
        <div className={`menu ${isMenuOpen ? "open" : ""}`}>
            <ul>
              <li onClick={() => handleNavigation("home")} className="hover-effect">Home</li>
              <li onClick={() => handleNavigation("about")} className="hover-effect">About</li>
              <li onClick={() => handleNavigation("contact")} className="hover-effect">Contact</li>
              <li onClick={() => handleNavigation("login")} className="hover-effect">Log In</li>
            </ul>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
            <div className={`bars-icon ${isMenuOpen ? "open" : ""}`}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
            </div>
        </div>
    </nav>
    );
};

Navbar.propTypes = {
    navigate: PropTypes.func.isRequired,
};

export default Navbar;
