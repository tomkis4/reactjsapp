import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChatPage.css';

function ChatPage() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Pobierz wiadomości czatu z serwera po załadowaniu komponentu
    fetchChatMessages();
  }, []);

  const fetchChatMessages = async () => {
    try {
      const response = await fetch('http://localhost:8081/get-chat-messages');
      if (!response.ok) {
        throw new Error('Error fetching chat messages');
      }
      const data = await response.json();
      setChatMessages(data.messages);
    } catch (error) {
      console.error('Error fetching chat messages:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8081/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, message }),
      });

      if (response.ok) {
        // Zapisano wiadomość pomyślnie
        console.log('Message sent successfully!');
        // Pobierz najnowsze wiadomości czatu
        fetchChatMessages();
        // Wyczyść pole wiadomości
        setMessage('');
      } else {
        // Błąd podczas wysyłania wiadomości
        console.error('Error sending message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
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

  // Funkcja do przekierowania na stronę z faktami o kotach
  const handleGoToCatFacts = () => {
    navigate('/CatFacts'); // Przekierowujemy użytkownika na stronę z faktami o kotach
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Witaj, {username}</h1>
        <div>
          <button onClick={handleLogout}>Wyloguj się</button>
          <button onClick={handleGoToCatsImages}>Zobacz obrazy kotów</button>
          <button onClick={handleGoToCatFacts}>Zobacz fakty o kotach</button>
        </div>
      </div>
      <h2>Chat</h2>
      <div>
        {chatMessages.map((chatMessage, index) => (
          <div key={index}>
            <strong>{chatMessage.username}: </strong> {chatMessage.message}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Your username"
          required
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default ChatPage;

