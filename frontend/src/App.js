import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GoogleSignIn from './GoogleSignIn';  // Import GoogleSignIn
import Home from './Home';  // Create a Home component to display after login

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<GoogleSignIn />} />
      <Route path="/home" element={<Home />} />   
    </Routes>
  );
};

export default App;
