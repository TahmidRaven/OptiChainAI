import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar/Navbar.jsx";
import Contact from "./Components/Contact/Contact.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import Login from "./Components/Login/Login.jsx";
import Home from "./Components/Home/Home.jsx";
import Registration from "./Components/Registration/Registration.jsx";
import ForecastChart from "./Components/Forecasting/ForecastChart.jsx";
<<<<<<< HEAD
import Profile from "./Components/Profile/Profile.jsx";
=======
import InventoryOptimize from "./Components/Inventory/InventoryOptimize.jsx";
import SupplierAnalytics from "./Components/Supplier/SupplierAnalytics.jsx";
import RouteOptimization from "./Components/Route/RouteOptimization.jsx";
import PurchaseOrderSuggest from "./Components/PO/PurchaseOrderSuggest.jsx";
import DynamicPricing from "./Components/Pricing/DynamicPricing.jsx";

>>>>>>> 358c7579379a30b36bd267ad894b946da2520380

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
      case "profile":
        return <Profile navigate={changePage}/>;
      case "registration":
        return <Registration navigate={changePage}/>;
      case "forecast":
        return <ForecastChart />;
      case "inventory":
        return <InventoryOptimize />;
      case "supplier":
        return <SupplierAnalytics />;
      case "route":
        return <RouteOptimization />;
      case "purchase-orders":
        return <PurchaseOrderSuggest />;
      case "pricing":
        return <DynamicPricing />;
      default:
        return <Home navigate={changePage} />;
    }
  };

  return ( 
    <div className="App">
      <Navbar navigate={changePage} />
      <div className={`page-content ${isTransitioning ? "page-transition-exit" : "page-transition-enter"}`}>
        {renderPage()}
      </div>
      <Footer navigate={changePage} />
      <div>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default App;
