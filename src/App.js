import React, { useState } from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';
import FileUpload from "./components/FileUpload";
import ImageGallery from "./components/ImageGallery";
import SearchComponent from "./components/SearchComponent";
import Login from "./components/Login";
import "./App.css";

function App() {
  const [images, setImages] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [user, setUser] = useState(null);

  // Function to handle file uploads
  const handleFileUpload = (fileObject) => {
    const updatedImages = [...images, fileObject];
    setImages(updatedImages);
    setImageUrl(fileObject.url);
  };

  // Function to fetch image from vector search API
  const fetchImage = async (query) => {
    try {
      const response = await fetch(`https://semantic-image-tagger.vercel.app/vector_search/${query}`);
      const data = await response.json();
      const imageUrl = `https://sitproto.s3.us-east-2.amazonaws.com/${data.repsonse}`
      console.log('Fetched image URL:', imageUrl);
      setImageUrl(imageUrl);
      return imageUrl;
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    }
  };

  // Function to handle search results
  const handleSearchResults = async (query) => {
    if (query.trim() === "") {
      setImageUrl("");
      return;
    }
    await fetchImage(query);
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div className="app-container">
        <header className="header">
          <h1>Memory Finder</h1>
          <p>Your personalized image gallery!</p>
          <p>Upload Photos, Save to Your Cloud Photo Library, Retrieve Them With Ease</p>
          <Login setUser={setUser} />
        </header>

        {user ? (
          <>
            <FileUpload className="file-upload" onFileUpload={handleFileUpload} />
            <SearchComponent onQueryChange={handleSearchResults} fetchImage={fetchImage} />
            <ImageGallery imageUrl={imageUrl} />
          </>
        ) : (
          <div className="welcome-message">
            <p>Please sign in to access your personal image gallery</p>
          </div>
        )}
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;