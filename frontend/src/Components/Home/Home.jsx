import React from 'react';
import Header from '../Header/Header.jsx';
import './Home.css';

const featureData = [
  {
    title: 'Demand Forecasting',
    desc: 'Predict demand using AI and trends to prevent stockouts and overstocking.',
    img: 'https://cdn-icons-png.flaticon.com/512/2329/2329083.png',
    route: 'forecast'
  },
  {
    title: 'Inventory Optimization',
    desc: 'AI-driven recommendations on stock levels and reorder points.',
    img: 'https://cdn-icons-png.flaticon.com/512/2920/2920222.png',
  },
  {
    title: 'Supplier Analytics',
    desc: 'Evaluate supplier performance with AI scoring and trend analysis.',
    img: 'https://cdn-icons-png.flaticon.com/512/4359/4359960.png',
  },
  {
    title: 'Route Optimization',
    desc: 'AI plans fastest routes to reduce delivery time and fuel costs.',
    img: 'https://cdn-icons-png.flaticon.com/512/854/854878.png',
  },
  {
    title: 'Auto Purchase Orders',
    desc: 'Smart alerts and auto-ordering via WhatsApp or email.',
    img: 'https://cdn-icons-png.flaticon.com/512/3595/3595455.png',
  },
  {
    title: 'Dynamic Pricing',
    desc: 'Get pricing suggestions based on demand and competitors.',
    img: 'https://cdn-icons-png.flaticon.com/512/2936/2936844.png',
  },
];

const KeyFeatures = ({ navigate }) => {
  return (
    <div><Header navigate={navigate} />
      <div className="container">
        <div className="features-container">
          {featureData.map((feature, index) => (
            <div
              key={index}
              className="feature-card"
              onClick={() => {
                if (feature.title === "Demand Forecasting") {
                  navigate("forecast");
                }
              }}
              style={{ cursor: feature.title === "Demand Forecasting" ? "pointer" : "default" }}
            >
              <img src={feature.img} alt={feature.title} className="feature-icon" />
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KeyFeatures;