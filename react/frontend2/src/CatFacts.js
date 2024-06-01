import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CatFacts.css';

function CatFacts() {
  const [catFact, setCatFact] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCatFact();
  }, []);

  const fetchCatFact = async () => {
    try {
      const response = await fetch('https://catfact.ninja/fact');
      if (!response.ok) {
        throw new Error('Błąd pobierania danych');
      }
      const data = await response.json();
      setCatFact(data.fact);
    } catch (error) {
      console.error('Błąd pobierania ciekawostki o kotach:', error);
    }
  };

  const handleNextFact = () => {
    fetchCatFact();
  };

  // Funkcja do obsługi wylogowania
  const handleLogout = () => {
    // Tutaj możemy dodać logikę czyszczenia danych sesji lub tokenów autoryzacyjnych
    navigate('/'); // Przekierowujemy użytkownika na stronę główną po wylogowaniu
  };

  // Funkcja do przekierowania na stronę z obrazami kotów
  const handleGoToCatsImages = () => {
    navigate('/CatsImages'); // Przekierowujemy użytkownika na stronę z obrazami kotów
  };

  // Funkcja do przekierowania na stronę z czatem o kotach
  const handleGoToCatChat = () => {
    navigate('/Chat'); // Przekierowujemy użytkownika na stronę z czatem o kotach
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Ciekawostka o kotach</h1>
        <div>
          <button onClick={handleLogout}>Wyloguj się</button>
          <button onClick={handleGoToCatsImages}>Zobacz obrazy kotów</button>
          <button onClick={handleGoToCatChat}>Zobacz czat o kotach</button>
        </div>
      </div>
      <p>{catFact}</p>
      <button onClick={handleNextFact}>Wyświetl kolejny fakt o kotach</button>
    </div>
  );
}

export default CatFacts;
