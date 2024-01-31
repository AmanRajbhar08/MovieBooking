// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ShowDetails from './components/ShowDetails';
import BookingForm from './components/BookingForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/show/:id" element={<ShowDetails />} />
        <Route path="/book/:id" element={<BookingForm />} />
      </Routes>
    </Router>
  );
}

export default App;
