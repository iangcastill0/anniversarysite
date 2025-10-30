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

        <section className="closing-message">
          <p className="closing-paragraph">
            This past year with you has been the most incredible journey of my life. 
            From our first moments together to all the adventures we've shared, 
            every day has been filled with laughter, love, and unforgettable memories. 
            You've shown me what it means to truly love and be loved, 
            to find joy in the simplest moments, 
            and to push myself harder than I ever thought possible. 
            Through every silly moment, every adventure, every celebration, and every quiet evening together, you have made me so happy in every moment spent with you. 
            I can't wait to see what the future holds for us, to create even more amazing memories, and to continue building this amazing life together. 
            Happy one year to us, happy one year to our love, and to many more incredible moments yet to come i can't wait!

          </p>
          <h2 className="closing-title">I LOVE YOU SOOOOO MUCH</h2>
        </section>

        <footer className="anniversary-footer">
          <p></p>
        </footer>
      </div>
    </div>
  );
}

export default App;
