import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Contact from "./Components/Contact/Contact.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import Login from "./Components/Login/Login.jsx";
import Home from "./Components/Home/Home.jsx";
import Registration from "./Components/Registration/Registration.jsx";

const App = () => {
  const [currentPage, setCurrentPage] = useState(() => {
    return window.location.pathname.slice(1) || "home";
  });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [message, setMessage] = useState("");

  const changePage = (newPage) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(newPage);
      setIsTransitioning(false);
    }, 500);
  };

  useEffect(() => {
    fetch("http://localhost:8000/")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setMessage(data.message);
      })
      .catch(error => console.error("Error connecting to backend:", error));
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <Home navigate={changePage} />;
      case "contact":
        return <Contact />;
      case "login":
        return <Login navigate={changePage}/>;
      case "registration":
        return <Registration navigate={changePage}/>;
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
      {/* Display the message from FastAPI */}
      <div>
        <h2>Backend Message:</h2>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default App;
