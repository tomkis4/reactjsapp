import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Tutaj możesz dodać logikę czyszczenia danych sesji, itp.
    setIsLoggedIn(false);
    // Przekieruj użytkownika na stronę logowania
    navigate('/login');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Witaj w CatsApp</h1>
        {isLoggedIn ? (
          <div>
            <p>Pomyślnie zalogowano!</p>
            <button onClick={handleLogout}>Wyloguj się</button>
          </div>
        ) : (
          <div>
            <Link to="/login">
              <button>Logowanie</button>
            </Link>
            <Link to="/register">
              <button>Rejestracja</button>
            </Link>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;


