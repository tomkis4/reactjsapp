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

    // Sprawdź, czy użytkownik istnieje w bazie danych i czy podał poprawne hasło
    connection.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
        if (err) {
            console.error('Błąd podczas logowania:', err);
            res.status(500).json({ message: 'Błąd podczas logowania' });
            return;
        }
        if (results.length === 0) {
            // Użytkownik o podanej nazwie lub haśle nie istnieje
            res.status(401).json({ message: 'Invalid username or password' }); // Zmiana komunikatu na angielski
            return;
        }

        // Logowanie pomyślne
        console.log('Logged in successfully:', username); // Zmiana komunikatu na angielski
        res.status(200).json({ message: 'Logged in successfully', username: username }); // Zmiana komunikatu na angielski
    });
});

// Endpoint do pobierania nazwy zalogowanego użytkownika
app.get('/get-username', (req, res) => {
    // Tutaj możemy użyć sesji lub innego sposobu autoryzacji, aby uzyskać nazwę zalogowanego użytkownika
    // Na potrzeby tego przykładu zwracamy nazwę użytkownika przekazaną w zapytaniu query (niezależnie od autoryzacji)
    const username = req.query.username;
    if (!username) {
        return res.status(400).json({ message: 'Username missing in request' }); // Zmiana komunikatu na angielski
    }
    
    // Tutaj pobieramy nazwę użytkownika z bazy danych
    connection.query('SELECT username FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            console.error('Błąd podczas pobierania nazwy użytkownika:', err);
            res.status(500).json({ message: 'Error while fetching username' }); // Zmiana komunikatu na angielski
            return;
        }

        // Sprawdzamy, czy użytkownik istnieje w bazie danych
        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' }); // Zmiana komunikatu na angielski
        }

        // Zwracamy nazwę użytkownika
        res.status(200).json({ username: results[0].username });
    });
});

// Obsługa żądania rejestracji
app.post('/register', (req, res) => {
    // Odbierz dane z formularza rejestracji
    const { username, password } = req.body;

    // Sprawdź, czy użytkownik już istnieje w bazie danych
    connection.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            console.error('Błąd podczas sprawdzania użytkownika:', err);
            res.status(500).json({ message: 'Error during registration' }); // Zmiana komunikatu na angielski
            return;
        }
        if (results.length > 0) {
            // Użytkownik o podanej nazwie już istnieje
            res.status(400).json({ message: 'User already exists' }); // Zmiana komunikatu na angielski
            return;
        }

        // Dodaj nowego użytkownika do bazy danych
        connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err, result) => {
            if (err) {
                console.error('Błąd podczas rejestracji:', err);
                res.status(500).json({ message: 'Error during registration' }); // Zmiana komunikatu na angielski
                return;
            }
            console.log('New user has been added');
            res.status(200).json({ message: 'Registration successful' }); // Zmiana komunikatu na angielski
        });
    });
});

// Endpoint dla strony głównej
app.get('/', (req, res) => {
    res.send('Welcome to CatsApp');
});

// Endpoint do zapisywania wiadomości czatu
app.post('/send-message', (req, res) => {
    const { username, message } = req.body;

    if (!username || !message) {
        return res.status(400).json({ message: 'Invalid message data' }); // Zmiana komunikatu na angielski
    }

    // Zapisz wiadomość do bazy danych
    connection.query('INSERT INTO chat_messages (username, message) VALUES (?, ?)', [username, message], (err, result) => {
        if (err) {
            console.error('Error while saving chat message:', err);
            res.status(500).json({ message: 'Error while saving chat message' }); // Zmiana komunikatu na angielski
            return;
        }
        console.log('Chat message saved successfully');
        res.status(200).json({ message: 'Chat message saved successfully' }); // Zmiana komunikatu na angielski
    });
});

// Endpoint do pobierania wiadomości czatu
app.get('/get-chat-messages', (req, res) => {
    // Pobierz wiadomości czatu z bazy danych
    connection.query('SELECT * FROM chat_messages', (err, results) => {
        if (err) {
            console.error('Błąd podczas pobierania wiadomości czatu:', err);
            res.status(500).json({ message: 'Error while fetching chat messages' }); // Zmiana komunikatu na angielski
            return;
        }

        // Zwróć wiadomości czatu
        res.status(200).json({ messages: results });
    });
});

// Zamykanie połączenia z bazą danych po zakończeniu pracy
process.on('exit', () => {
    connection.end();
    console.log('Connection to the database has been closed');
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
