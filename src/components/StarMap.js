import React from 'react';
import './StarMap.css';

function StarMap({ imageSrc }) {
  return (
    <div className="star-map-container">
      <div className="star-map-circle">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt="Star Map"
            className="star-map-image"
          />
        ) : (
          <div className="star-map-placeholder">
            <p>Add your star map image</p>
          </div>
        )}
      </div>
      <div className="star-map-label">
        <h2>Our Night Sky</h2>
        <p>11/12/2024</p>
      </div>
    </div>
  );
}

export default StarMap;
