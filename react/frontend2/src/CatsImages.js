import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CatsImages.css';

function CatsImages() {
  const [catImage, setCatImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCatImage();
  }, []);

  const fetchCatImage = async () => {
    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search?limit=1', {
        headers: {
          'x-api-key': 'live_Kg8HqvTiYpHdztHFk3w6RiVaptksun4cHmjtX90wKZ6qVKz1ZZ47wNizOntIlACC'
        }
      });
      if (!response.ok) {
        throw new Error('Błąd pobierania danych');
      }
      const data = await response.json();
      setCatImage(data[0].url);
    } catch (error) {
      console.error('Błąd pobierania obrazu kota:', error);
    }
  };

  const handleNextImage = () => {
    fetchCatImage();
  };

  // Funkcja do obsługi wylogowania
  const handleLogout = () => {
    // Tutaj możemy dodać logikę czyszczenia danych sesji lub tokenów autoryzacyjnych
    navigate('/'); // Przekierowujemy użytkownika na stronę główną po wylogowaniu
  };

  // Funkcja do przekierowania na stronę z fakty o kotach
  const handleGoToCatFacts = () => {
    navigate('/CatFacts'); // Przekierowujemy użytkownika na stronę z faktami o kotach
  };

  // Funkcja do przekierowania na stronę z czatem o kotach
  const handleGoToCatChat = () => {
    navigate('/Chat'); // Przekierowujemy użytkownika na stronę z czatem o kotach
  };

  return (
    <div className="cats-images-container">
      <div className="cats-images-header">
        <h1>Obraz kota</h1>
        <div>
          <button onClick={handleLogout}>Wyloguj się</button>
          <button onClick={handleGoToCatFacts}>Zobacz fakty o kotach</button>
          <button onClick={handleGoToCatChat}>Zobacz czat o kotach</button>
        </div>
      </div>
      <div className="cat-image-container">
        <img src={catImage} alt="Cat" className="cat-image" />
        <button onClick={handleNextImage}>Wyświetl kolejny obraz kota</button>
      </div>
    </div>
  );
}

export default CatsImages;

