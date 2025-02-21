// App.jsx
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Importe o BrowserRouter
import MainPage from './Pages/MainPage';
import JobInfoPage from './Pages/JobInfoPage';

import './styles/index.css'; 

function App() {
  return (
    <BrowserRouter> {/* Envolva suas rotas com o BrowserRouter */}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/job-info" element={<JobInfoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
