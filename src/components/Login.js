import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';  // Changed from jwt_decode to jwtDecode

const Login = ({ setUser }) => {
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <div className="auth-container">
      {!localStorage.getItem('user') ? (
        <GoogleLogin
          onSuccess={credentialResponse => {
            const decoded = jwtDecode(credentialResponse.credential);  // Changed from jwt_decode to jwtDecode
            setUser(decoded);
            localStorage.setItem('user', JSON.stringify(decoded));
          }}
          onError={() => {
            console.log('Login Failed');
          }}
          useOneTap
          theme="filled_black"
          shape="pill"
          size="large"
        />
      ) : (
        <button onClick={handleLogout} className="logout-button">
          Sign Out
        </button>
      )}
    </div>
  );
};

export default Login;