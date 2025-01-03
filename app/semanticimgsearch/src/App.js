import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import ImageGallery from "./components/ImageGallery";
import SearchComponent from "./components/SearchComponent";
import "./App.css";

function App() {
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  // Function to handle file uploads
  const handleFileUpload = (fileObject) => {
    const updatedImages = [...images, fileObject];
    setImages(updatedImages);
    setImageUrls([...imageUrls, fileObject.url]); // Add uploaded image URL to imageUrls
  };

  // Function to fetch image from vector search API (make it async)
  const fetchImage = async (query) => {
    try {
      const response = await fetch(`https://semantic-image-tagger.vercel.app/vector_search/${query}`);
      const data = await response.json(); // Parse the JSON response
      const imageUrls = `https://sitproto.s3.us-east-2.amazonaws.com/${data.repsonse}`
      console.log(imageUrls); // Check the image URLs
      setImageUrls(imageUrls); // Set image URLs to state
      return imageUrls;
    } catch (error) {
      console.error("Error fetching image:", error);
      return []; // Return an empty array if an error occurs
    }
  };

  // Function to handle search results
  const handleSearchResults = async (query) => {
    if (query.trim() === "") {
      setImageUrls([]); // Clear image URLs if the query is empty
      return;
    }

    const searchResult = await fetchImage(query); // Fetch image data based on the query
    setImageUrls(searchResult); // Update image URLs with the fetched results
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Memory Finder</h1>
        <p>Your personalized image gallery</p>
      </header>

      <FileUpload onFileUpload={handleFileUpload} />

      <SearchComponent onQueryChange={handleSearchResults} fetchImage={fetchImage} />

      <ImageGallery images={imageUrls} />
    </div>
  );
}

export default App;
