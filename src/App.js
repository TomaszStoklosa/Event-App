import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListaComponent from './Komponenty/ListaComponent.tsx';
import KomponentWydarzenia from './Komponenty/WydarzenieComponent.tsx';
import NoweWydarzenieComponent from './Komponenty/NoweWydarzenieComponent.tsx';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListaComponent/>} />
        <Route path="/event/:id" element={<KomponentWydarzenia/>} />
        <Route path="/addEvent" element={<NoweWydarzenieComponent/>} />
      </Routes>
    </Router>
  );
}

export default App;