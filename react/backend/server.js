const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Dodajemy middleware do obsługi danych JSON

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'reactjs'
});

// Obsługa błędów podczas łączenia z bazą danych
connection.connect((err) => {
    if (err) {
        console.error('Błąd podczas łączenia z bazą danych:', err.stack);
        return;
    }
    console.log('Połączenie z bazą danych zostało ustanowione');
});

// Obsługa błędów w trakcie pracy z bazą danych
connection.on('error', (err) => {
    console.error('Błąd w bazie danych:', err);
});

// Obsługa żądania logowania
app.post('/login', (req, res) => {
    // Odbierz dane z formularza logowania
    const { username, password } = req.body;

    // Tutaj dodaj logikę weryfikacji danych logowania
    // Możesz wykonać zapytanie do bazy danych w celu sprawdzenia poprawności danych

    // Na razie zwróć po prostu informację o udanym logowaniu
    res.json({ message: 'Zalogowano pomyślnie' });
});

// Obsługa żądania rejestracji
app.post('/register', (req, res) => {
    // Odbierz dane z formularza rejestracji
    const { username, password } = req.body;

    // Tutaj dodaj logikę rejestracji
    // Możesz wykonać zapytanie do bazy danych w celu dodania nowego użytkownika

    // Na razie zwróć po prostu informację o udanej rejestracji
    res.json({ message: 'Rejestracja pomyślna' });
});

// Endpoint dla strony głównej
app.get('/', (req, res) => {
    res.send('Welcome to CatsApp');
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});

// Zamykanie połączenia z bazą danych po zakończeniu pracy
process.on('exit', () => {
    connection.end();
    console.log('Połączenie z bazą danych zostało zakończone');
});
