import React from "react";

const ImageGallery = ({ images }) => {
  return (
    <div className="gallery-container">
      {images.map((url, index) => (
        <div key={index} className="gallery-item">
          <img src={url} alt={`Image ${index}`} className="gallery-image" />
          <div className="image-info">
            <a href={url} target="_blank" rel="noopener noreferrer" className="image-link">
              View Full Image
            </a>
            <a href={url} download={`downloaded_image_${index}.jpg`} className="download-link">
              Download Image
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
