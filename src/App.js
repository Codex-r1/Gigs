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
import Jobs from './pages/jobs';
import Detail from './pages/detail'; 

function App() {
  return (
    <BrowserRouter>
      <Navbar />
<Header />
      <Routes>
<Route path="/header" element={<Header />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/detail" element={<Detail />} />
        {/* Add more routes as needed */}
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
