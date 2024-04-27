import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListaComponent from './listaComponent.tsx';
import KomponentWydarzenia from './WydarzenieComponent.tsx';
import './App.css';
import FormComponent from './formComponent.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListaComponent/>} />
        <Route path="/event/:id" element={<KomponentWydarzenia/>} />
        <Route path="/addEvent" element={<FormComponent/>} />
      </Routes>
    </Router>
  );
}

export default App;