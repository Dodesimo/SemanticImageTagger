import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import ImageGallery from "./components/ImageGallery";
import SearchComponent from "./components/SearchComponent";
import "./App.css";

function App() {
  const [images, setImages] = useState([]);
  const [imageUrl, setImageUrl] = useState(""); // Changed from imageUrls array to single imageUrl

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
      console.log('Fetched image URL:', imageUrl); // Debug log
      setImageUrl(imageUrl); // Set the single image URL
      return imageUrl;
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    }
  };

  // Function to handle search results
  const handleSearchResults = async (query) => {
    if (query.trim() === "") {
      setImageUrl(""); // Clear image URL if query is empty
      return;
    }

    await fetchImage(query);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Memory Finder</h1>
        <p>Your personalized image gallery!</p>
        <p>Upload Photos, Save to Your Cloud Photo Library, Retrieve Them With Ease</p>
      </header>

      <FileUpload className="file-upload" onFileUpload={handleFileUpload} />

      <SearchComponent onQueryChange={handleSearchResults} fetchImage={fetchImage} />

      <ImageGallery imageUrl={imageUrl} /> {/* Pass the single imageUrl */}
    </div>
  );
}

export default App;