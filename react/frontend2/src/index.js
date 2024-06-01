import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import MainPage from './MainPage';
import CatsImages from './CatsImages'; 
import CatFacts from './CatFacts';
import ChatPage from './ChatPage'; // Importujemy komponent ChatPage
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/MainPage" element={<MainPage />} /> 
        <Route path="/CatsImages" element={<CatsImages />} /> 
        <Route path="/CatFacts" element={<CatFacts />} /> 
        <Route path="/Chat" element={<ChatPage />} /> 
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);


