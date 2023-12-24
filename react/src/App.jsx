// App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Menu from './components/Menu/menu';
import HomePage from './components/Pages/HomePage';
import SignIn from './components/Pages/sign/SignIn';
import SignUp from './components/Pages/sign/SignUp';
import Cards from './components/Useful/Cards';
import About from './components/Pages/About';
import Footer from './components/Footer';
import MyAccount from './components/Pages/MyAccount';
import HorizontalLinearStepper from './components/Feature/AddProject/steps/managerSteps'
import Details from './components/Pages/Blog/blog'
import Success from './components/Pages/SuccessPage'
import CommentList from './components/Useful/CommentList'
import '../src/index.css';

export default function App() {
  const [projects, setProjects] = useState([]);
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Cards/:categoryId" element={<Cards projects={projects} />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/AddProject" element={<HorizontalLinearStepper />} />
        <Route path="/About" element={<About />} />
        <Route path="/MyAccount" element={<MyAccount />} />
        <Route path="/Details" element={<Details />} />
        <Route path="/Success" element={<Success />} />
        <Route path="/CommentList" element={<CommentList />} />
        
        
      </Routes>

      <Footer />
    </>
  );
}
