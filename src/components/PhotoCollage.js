import React, { useState, useEffect } from 'react';
import './PhotoCollage.css';

// Hardcoded collages with your actual images
const INITIAL_COLLAGES = [
  {
    id: 'collage1',
    title: 'Our Silly Moments',
    photos: [
      { id: 'photo1-1', url: `${process.env.PUBLIC_URL}/images/IMG_6798.png`, description: 'Our special kiss tehehehe', rotation: 0 },
      { id: 'photo1-2', url: `${process.env.PUBLIC_URL}/images/IMG_7017.png`, description: 'When were not allowed in bed because were stinky', rotation: 0 },
      { id: 'photo1-3', url: `${process.env.PUBLIC_URL}/images/IMG_7094.png`, description: 'When we are feeling goofy ', rotation: 90 },
      { id: 'photo1-4', url: `${process.env.PUBLIC_URL}/images/IMG_7200.png`, description: 'Our snapchat filter sessions', rotation: 0 },
      { id: 'photo1-5', url: `${process.env.PUBLIC_URL}/images/IMG_7620.png`, description: 'Getting our morning goofies out', rotation: 0 },
    ]
  },
  {
    id: 'collage2',
    title: 'US CRUISIN & BOOZIN',
    photos: [
      { id: 'photo2-1', url: `${process.env.PUBLIC_URL}/images/IMG_3936.png`, description: 'White night for me but you didnt want to join ', rotation: 0 },
      { id: 'photo2-2', url: `${process.env.PUBLIC_URL}/images/IMG_4309.png`, description: 'whhite night for you but on the wrong night ahahah', rotation: 0 },
      { id: 'photo2-3', url: `${process.env.PUBLIC_URL}/images/IMG_8112.png`, description: 'leaving port woot woot', rotation: 0 },
      { id: 'photo2-4', url: `${process.env.PUBLIC_URL}/images/IMG_8143.png`, description: 'first night roaming around the boat ', rotation: 0 },
      { id: 'photo2-5', url: `${process.env.PUBLIC_URL}/images/IMG_8144.png`, description: 'taking lots of pics because you look so beautiful ', rotation: 0 },
      { id: 'photo2-6', url: `${process.env.PUBLIC_URL}/images/IMG_8196.png`, description: '5 min before i got asked if i wanted to buy coke...', rotation: 0 },
    ]
  },
  {
    id: 'collage3',
    title: "OUR FIRST VALENTINE'S DAY",
    photos: [
      { id: 'photo3-1', url: `${process.env.PUBLIC_URL}/images/IMG_8298.png`, description: 'Our First Valentines day and the day i told you i loved you for the first time ', rotation: 0 },
    ]
  },
  {
    id: 'collage4',
    title: 'US BEING US',
    photos: [
      { id: 'photo4-1', url: `${process.env.PUBLIC_URL}/images/IMG_5945.png`, description: 'the day i asked you to be my girlfriend', rotation: 0 },
      { id: 'photo4-2', url: `${process.env.PUBLIC_URL}/images/IMG_6447.png`, description: 'went to the springs and walked the trails ', rotation: 0 },
      { id: 'photo4-3', url: `${process.env.PUBLIC_URL}/images/IMG_6564.png`, description: 'standing our ground at the NO KINGS protest', rotation: 90 },
      { id: 'photo4-4', url: `${process.env.PUBLIC_URL}/images/IMG_6780.png`, description: 'our first hawkers together', rotation: 0 },
      { id: 'photo4-5', url: `${process.env.PUBLIC_URL}/images/IMG_7549.png`, description: 'just us being adorable', rotation: 0 },
      { id: 'photo4-6', url: `${process.env.PUBLIC_URL}/images/IMG_7850.png`, description: 'us at the beach on a horribly windy day', rotation: 0 },
    ]
  },
];

function PhotoCollage() {
  const [collages, setCollages] = useState(INITIAL_COLLAGES);
  const [flippedCards, setFlippedCards] = useState({});
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [tempDescription, setTempDescription] = useState('');

  // Load saved descriptions and rotations from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('anniversaryPhotoData');
    if (savedData) {
      try {
        const photoData = JSON.parse(savedData);

        // Merge saved descriptions with initial collages, but keep hardcoded rotations as default
        const updatedCollages = INITIAL_COLLAGES.map(collage => ({
          ...collage,
          photos: collage.photos.map(photo => ({
            ...photo,
            description: photoData[photo.id]?.description || photo.description,
            rotation: photoData[photo.id]?.rotation !== undefined ? photoData[photo.id].rotation : photo.rotation
          }))
        }));

        setCollages(updatedCollages);
      } catch (error) {
        console.error('Error loading photo data from localStorage:', error);
      }
    }
  }, []);

  // Save only descriptions and rotations to localStorage
  useEffect(() => {
    const photoData = {};
    collages.forEach(collage => {
      collage.photos.forEach(photo => {
        photoData[photo.id] = {
          description: photo.description,
          rotation: photo.rotation
        };
      });
    });
    localStorage.setItem('anniversaryPhotoData', JSON.stringify(photoData));
  }, [collages]);


  const toggleFlip = (photoId) => {
    setFlippedCards(prev => ({
      ...prev,
      [photoId]: !prev[photoId]
    }));
  };

  const startEditing = (collageId, photo) => {
    setEditingPhoto({ collageId, photoId: photo.id });
    setTempDescription(photo.description);
  };

  const saveEdits = () => {
    setCollages(collages.map(collage =>
      collage.id === editingPhoto.collageId
        ? {
            ...collage,
            photos: collage.photos.map(photo =>
              photo.id === editingPhoto.photoId
                ? { ...photo, description: tempDescription }
                : photo
            )
          }
        : collage
    ));
    setEditingPhoto(null);
    setTempDescription('');
  };

  const cancelEditing = () => {
    setEditingPhoto(null);
    setTempDescription('');
  };

  const rotatePhoto = (collageId, photoId, direction) => {
    setCollages(collages.map(collage =>
      collage.id === collageId
        ? {
            ...collage,
            photos: collage.photos.map(photo =>
              photo.id === photoId
                ? {
                    ...photo,
                    rotation: direction === 'left'
                      ? (photo.rotation - 90 + 360) % 360
                      : (photo.rotation + 90) % 360
                  }
                : photo
            )
          }
        : collage
    ));
  };

  return (
    <div className="photo-collage-container">
      <h2 className="main-collage-title">Our Memories</h2>

      {/* Display All Collages */}
      {collages.map((collage) => (
        <div key={collage.id} className="collage-section">
          <div className="collage-header">
            <h3 className="collage-title">{collage.title}</h3>
          </div>

          <div className="photo-grid">
            {collage.photos.map((photo) => (
              <div key={photo.id} className={`flip-card ${flippedCards[photo.id] ? 'flipped' : ''}`}>
                <div className="flip-card-inner">
                  {/* Front of card - Photo */}
                  <div className="flip-card-front">
                    <img
                      src={photo.url}
                      alt="Memory"
                      style={{ transform: `rotate(${photo.rotation}deg)` }}
                    />
                    <button
                      className="flip-button"
                      onClick={() => toggleFlip(photo.id)}
                      aria-label="Flip card"
                    >
                      ↻
                    </button>
                  </div>

                    {/* Back of card - Description */}
                    <div className="flip-card-back">
                      {editingPhoto?.photoId === photo.id ? (
                        <div className="edit-form">
                          <textarea
                            placeholder="Add a description for this photo..."
                            value={tempDescription}
                            onChange={(e) => setTempDescription(e.target.value)}
                            className="edit-input caption-input"
                            rows="5"
                          />
                          <div className="rotation-controls">
                            <span className="rotation-label">Rotate:</span>
                            <button
                              onClick={() => rotatePhoto(collage.id, photo.id, 'left')}
                              className="rotate-button"
                              title="Rotate left 90°"
                            >
                              ↺
                            </button>
                            <button
                              onClick={() => rotatePhoto(collage.id, photo.id, 'right')}
                              className="rotate-button"
                              title="Rotate right 90°"
                            >
                              ↻
                            </button>
                          </div>
                          <div className="edit-buttons">
                            <button onClick={saveEdits} className="save-button">Save</button>
                            <button onClick={cancelEditing} className="cancel-button">Cancel</button>
                          </div>
                        </div>
                      ) : (
                        <div className="card-content">
                          <p className="card-caption">
                            {photo.description || 'Click edit to add a description'}
                          </p>
                          <div className="card-buttons">
                            <button
                              onClick={() => startEditing(collage.id, photo)}
                              className="edit-card-button"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => toggleFlip(photo.id)}
                              className="flip-back-button"
                            >
                              Back
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}

export default PhotoCollage;
