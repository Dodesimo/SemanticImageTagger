import React from "react";

const ImageGallery = ({ imageUrl }) => {
  return (
    <div className="gallery-container">
      {imageUrl && (
        <div className="gallery-item">
          <img src={imageUrl} alt="Fetched Image" className="gallery-image" />
          <div className="image-info">
            <a
              href={imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="image-link"
            >
            </a>
            <a
              href={imageUrl}
              download="downloaded_image.jpg"
              className="download-link"
            >
              Download Image
            </a>
          </div>
        </div>
      )}
    </div>
  );
};


export default ImageGallery;
