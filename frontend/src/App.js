import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddTrip from "./pages/AddTrip";
import AddComment from "./pages/AddComment";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <h1 className="navbar-title">Travel App</h1>
          <div className="navbar-links">
            <Link to="/" className="navbar-link">Inicio</Link>
            <Link to="/add-trip" className="navbar-link">Agregar Viaje</Link>
            <Link to="/add-comment" className="navbar-link">Agregar Comentario</Link>
          </div>
        </nav>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-trip" element={<AddTrip />} />
            <Route path="/add-comment" element={<AddComment />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;