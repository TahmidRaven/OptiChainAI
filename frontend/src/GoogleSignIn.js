import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';  // Correct import
import { useNavigate } from 'react-router-dom';

const GoogleSignIn = () => {
  const navigate = useNavigate();  // useNavigate hook to navigate after successful login

  const handleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;
    
    // Decode the token to check the user's details (optional)
    const decoded = jwtDecode(token);  // jwtDecode instead of jwt_decode
    console.log(decoded); // If needed, log the decoded information

    try {
      const res = await axios.post("http://localhost:8000/auth/google", {
        token: token,
        username: decoded.name.split('@')[0],  // Extract username from email (before '@')
        email: decoded.email,
        // Include password if needed
      });

      console.log("Backend response:", res.data);

      // Log to confirm before redirecting
      console.log('Login successful, redirecting to home...');
      navigate('/home');  // Redirect to home page after successful login
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleError = () => {
    console.log("Login Failed");
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
    />
  );
};

export default GoogleSignIn;
// Note: Ensure that the backend endpoint (http://localhost:8000/auth/google)  