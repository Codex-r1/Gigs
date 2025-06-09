import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
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
import Youth from './pages/youthdash';
import Admin from './pages/admindash';

function AppLayout() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <>
      <Navbar />
      {isHome && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/register" element={<Register />} />
        <Route path="/youthdash" element={<Youth />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/detail" element={<Detail />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
