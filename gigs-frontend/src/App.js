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
import Youth from './pages/youthdash';
import AdminDash from './pages/admindash';
import EmployerDash from './pages/employerdash';
import JobPostForm from './pages/jobpost';
import Settings from './pages/settings';
import About from './pages/about'; 
import ApplicantFAQs from './pages/FAQs';
import RateApplicant from './pages/rateapplicants';



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
        <Route path="/admindash" element={<AdminDash />} />
        <Route path="/employerdash" element={<EmployerDash />} />
        <Route path="/jobpost" element={<JobPostForm />} />
        <Route path="/rate/:applicantId" element={<RateApplicant />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/about" element={<About />} />
        <Route path="/FAQs" element={<ApplicantFAQs />} />
        {/* Add more routes as needed */}
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
