import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importujemy hook useNavigate
import './MainPage.css';

function MainPage() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate(); // Inicjalizujemy hook useNavigate

  useEffect(() => {
    // Tutaj umieść logikę pobierania nazwy użytkownika z serwera
    fetch('/get-username')
      .then(response => {
        if (!response.ok) {
          throw new Error('Błąd pobierania danych');
        }
        return response.json();
      })
      .then(data => {
        setUsername(data.username);
      })
      .catch(error => console.error('Błąd pobierania nazwy użytkownika:', error));
  }, []);

  // Funkcja do obsługi wylogowania
  const handleLogout = () => {
    // Tutaj możemy dodać logikę czyszczenia danych sesji lub tokenów autoryzacyjnych
    navigate('/'); // Przekierowujemy użytkownika na stronę główną po wylogowaniu
  };

  // Funkcja do przekierowania na stronę z obrazami kotów
  const handleGoToCatsImages = () => {
    navigate('/CatsImages'); // Przekierowujemy użytkownika na stronę z obrazami kotów
  };

  // Funkcja do przekierowania na stronę z faktami o kotach
  const handleGoToCatFacts = () => {
    navigate('/CatFacts'); // Przekierowujemy użytkownika na stronę z faktami o kotach
  };

  // Funkcja do przekierowania na stronę z czatem
  const handleGoToChat = () => {
    navigate('/Chat'); // Przekierowujemy użytkownika na stronę z czatem
  };

  return (
    <div>
      <h1>Witaj, {username}</h1>
      <button onClick={handleLogout}>Wyloguj się</button>
      <button onClick={handleGoToCatsImages}>Zobacz obrazy kotów</button>
      <button onClick={handleGoToCatFacts}>Zobacz fakty o kotach</button>
      <button onClick={handleGoToChat}>Przejdź do czatu</button> {/* Dodajemy przycisk do przekierowania na stronę z czatem */}
    </div>
  );
}

export default MainPage;
