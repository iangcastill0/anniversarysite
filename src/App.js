import React from 'react';
import './App.css';
import StarMap from './components/StarMap';
import PhotoCollage from './components/PhotoCollage';

function App() {
  // Hardcoded star map image path
  const starMapImage = `${process.env.PUBLIC_URL}/peronal_star_map.png`;

  return (
    <div className="App">
      <div className="anniversary-container">
        <header className="anniversary-header">
          <h1 className="main-title">One Year of Us</h1>
          <p className="subtitle">Celebrating our journey together</p>
        </header>

        <StarMap imageSrc={starMapImage} />

        <PhotoCollage />

        <footer className="anniversary-footer">
          <p></p>
        </footer>
      </div>
    </div>
  );
}

export default App;
