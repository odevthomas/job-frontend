// main.jsx (corrigido para React 18)
import React from 'react';
import ReactDOM from 'react-dom/client';  // Altere para 'react-dom/client'
import App from './App';
import './styles/index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));  // Criação de root
root.render(<App />);  // Agora utilizamos 'render' dentro do 'root'
