import React from 'react';

const featureData = [
  {
    title: 'Demand Forecasting',
    desc: 'Predict demand using AI and trends to prevent stockouts and overstocking.',
    img: 'https://cdn-icons-png.flaticon.com/512/2329/2329083.png',
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

const Home = () => {
  return (
    <div style={{
      fontFamily: 'Segoe UI, sans-serif',
      color: '#333',
      margin: '0',
      padding: '0',
      boxSizing: 'border-box',
      width: '100%',
      overflowX: 'hidden',
    }}>
      
      {/* Hero Section */}
      <div
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1470&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '15vh 5vw',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '6vw', fontWeight: 'bold', marginBottom: '2vh' }}>OptiChain Lite</h1>
        <p style={{ fontSize: '1.3rem', maxWidth: '90vw', margin: '0 auto' }}>
          AI-powered supply chain optimization for SMEs. Affordable. Scalable. Smart.
        </p>
        <button
          style={{
            marginTop: '4vh',
            padding: '1em 2em',
            fontSize: '1rem',
            backgroundColor: '#ffffff',
            color: '#4B0082',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Get Started
        </button>
      </div>

      {/* Features Section */}
      <div style={{ padding: '8vh 5vw', backgroundColor: '#f7f9fc', width: '100%' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 'bold', marginBottom: '5vh' }}>
          Key Features
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2rem',
            width: '100%',
            maxWidth: '1300px',
            margin: '0 auto',
            boxSizing: 'border-box',
          }}
        >
          {featureData.map((feature, index) => (
            <div
              key={index}
              style={{
                backgroundColor: '#ffffff',
                padding: '1.5rem',
                borderRadius: '15px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
                textAlign: 'center',
                boxSizing: 'border-box',
              }}
            >
              <img
                src={feature.img}
                alt={feature.title}
                style={{ width: '60px', height: '60px', marginBottom: '1rem' }}
              />
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {feature.title}
              </h3>
              <p style={{ fontSize: '0.95rem', color: '#555' }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack Section */}
      <div style={{ padding: '8vh 5vw', backgroundColor: '#fff', width: '100%' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>
          Technology Stack
        </h2>
        <ul
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            fontSize: '1rem',
            lineHeight: '2',
            listStyleType: 'none',
            paddingLeft: '0',
            textAlign: 'center',
            color: '#444',
          }}
        >
          <li><strong>Backend:</strong> FastAPI / Flask (Python)</li>
          <li><strong>Frontend:</strong> React.js / Vue.js</li>
          <li><strong>AI Models:</strong> Prophet, LSTM, ARIMA, Reinforcement Learning</li>
          <li><strong>Database:</strong> PostgreSQL / Firebase</li>
          <li><strong>Deployment:</strong> AWS Lambda / Google Cloud Functions</li>
        </ul>
      </div>

      {/* Call to Action */}
      <div
        style={{
          background: 'linear-gradient(to right, #6a11cb, #2575fc)',
          color: '#fff',
          padding: '10vh 5vw',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Ready to Optimize Your Supply Chain?</h2>
        <p style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
          Join SMEs worldwide using OptiChain Lite to level up their logistics and inventory game.
        </p>
        <button
          style={{
            padding: '0.8em 2em',
            fontSize: '1rem',
            backgroundColor: '#fff',
            color: '#4B0082',
            border: 'none',
            borderRadius: '10px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          Start Now
        </button>
      </div>
    </div>
  );
};

export default Home;
