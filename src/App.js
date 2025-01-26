import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import ImageGallery from "./components/ImageGallery";
import SearchComponent from "./components/SearchComponent";
import "./App.css";

function App() {
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  // Function to fetch image from vector search API
  const fetchImage = async (query) => {
    try {
      const response = await fetch(`https://semantic-image-tagger.vercel.app/vector_search/${query}`);
      const data = await response.json();
      const imageUrl = `https://sitproto.s3.us-east-2.amazonaws.com/${data.response}`; // Ensure correct response field
      console.log("Fetched image URL:", imageUrl);
      setImageUrls((prevUrls) => [...prevUrls, imageUrl]); // Add the fetched URL to the list
      return imageUrl;
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Memory Finder</h1>
        <p>Your personalized image gallery</p>
      </header>

      <FileUpload />

      <SearchComponent fetchImage={fetchImage} />

      {/* Pass the fetched URLs to the ImageGallery */}
      <ImageGallery images={imageUrls} />
    </div>
  );
}

export default App;
