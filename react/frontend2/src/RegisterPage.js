import React, { useState } from 'react';
import './RegisterPage.css';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8081/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Rejestracja pomyślna
        console.log('Rejestracja pomyślna!');
        // Przekierowanie na stronę logowania
        window.location.href = '/login';
      } else {
        // Błąd rejestracji
        console.error('Błąd rejestracji');
        // Pobranie komunikatu błędu z odpowiedzi serwera
        const data = await response.json();
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error('Błąd podczas wysyłania żądania rejestracji:', error);
      setErrorMessage('Błąd podczas wysyłania żądania rejestracji');
    }
  };

  return (
    <div>
      <h2>Rejestracja</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Nazwa użytkownika:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Hasło:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Zarejestruj się</button>
      </form>
    </div>
  );
}

export default RegisterPage;
