import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8081/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Zalogowano pomyślnie
        console.log('Zalogowano pomyślnie!');
        // Przekierowanie na stronę główną po udanym logowaniu
        navigate('/MainPage'); // Przekierowanie na stronę główną po udanym logowaniu
      } else {
        // Błąd logowania
        console.error('Błąd logowania');
      }
    } catch (error) {
      console.error('Błąd podczas wysyłania żądania logowania:', error);
    }
  };

  return (
    <div>
      <h2>Logowanie</h2>
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
        <button type="submit">Zaloguj się</button>
      </form>
    </div>
  );
}

export default LoginPage;
