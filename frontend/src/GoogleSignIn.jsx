import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const GoogleSignIn = () => {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;
    const decoded = jwtDecode(token);

    try {
      const res = await axios.post("http://localhost:8000/auth/google", {
        token: token,
        username: decoded.name || decoded.email.split('@')[0],
        email: decoded.email,
      });

      // Store both the Google token and your backend token
      localStorage.setItem('google_token', token);
      localStorage.setItem('auth_token', res.data.access_token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      navigate('/profile');  // Changed from '/home' to match your routes
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.log("Login Failed")}
        useOneTap  // Optional: enables Google One Tap
      />
    </div>
  );
};

export default GoogleSignIn;
