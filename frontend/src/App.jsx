import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar/Navbar.jsx";
import About from "./Components/About/About.jsx";
import Contact from "./Components/Contact/Contact.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import Login from "./Components/Login/Login.jsx";
import Home from "./Components/Home/Home.jsx";


const App = () => {
  const [currentPage, setCurrentPage] = useState(() => {
    return window.location.pathname.slice(1) || "home";
  });
  const [isTransitioning, setIsTransitioning] = useState(false);

  const changePage = (newPage) => {
    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentPage(newPage);
      setIsTransitioning(false);
    }, 500);
  };

  useEffect(() => {
    const handlePopState = () => {
      const page = window.location.pathname.slice(1) || "home";
      setCurrentPage(page);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home navigate={changePage} />;
      case "about":
        return <About />;
      case "contact":
        return <Contact />;
      case "login":
        return <Login />;
      default:
        return <Home navigate={changePage} />;
    }
  };

  return (
    <div>
      <Navbar navigate={changePage} />
      <div className={`page-content ${isTransitioning ? "page-transition-exit" : "page-transition-enter"}`}>
        {renderPage()}
      </div>
      <Footer navigate={changePage} />
    </div>
  );
};

export default App;
