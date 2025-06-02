import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Layout components
import Header from './components/header';
import Navbar from './components/navbar';
import Footer from './components/footer';

// Page components
import Home from './components/home';
import Login from './pages/login';
import Companies from './pages/companies';
import Register from './pages/register';
import Browse from './pages/browse';
import Detail from './pages/detail'; 
import Profile from './components/profile'; // Assuming you have a Profile component

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/register" element={<Register />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/profile" element={<Profile />} />
        {/* Add more routes as needed */}
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
