import React, { useState } from "react";

const SearchComponent = ({ onQueryChange, fetchImage }) => {
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    if (query.trim() === "") {
      alert("Please enter a valid query.");
      return;
    }

    const image = await fetchImage(query); // Call fetchImage with the query
    if (image) {
      alert("Image retrieved: " + image); // Optionally display the fetched image
    } else {
      alert("No image found for the given query.");
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search by name, tags, or date..."
        value={query}
        onChange={(e) => setQuery(e.target.value)} // Set the query state
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
    </div>
  );
};

export default SearchComponent;
