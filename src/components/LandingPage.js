import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <header className="landing-header">
        <h1>Welcome to Memory Finder</h1>
        <p>Your personalized image gallery at your fingertips!</p>
        <p>Upload photos, save them to the cloud, and retrieve them with ease using AI-powered search.</p>
      </header>
      <div className="landing-actions">
        <button
          className="get-started-button"
          onClick={() => navigate("/home")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
