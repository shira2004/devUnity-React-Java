// App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Menu from './components/Menu/menu';
import HomePage from './components/Pages/HomePage';
import SignIn from './components/Pages/sign/SignIn';
import SignUp from './components/Pages/sign/SignUp';
import Cards from './components/Useful/Cards';
import AddProject from './components/Feature/AddProject/AddProject';
import About from './components/Pages/About';
import Footer from './components/Footer';
import axios from 'axios';

import '../src/index.css';

export default function App() {
  const [users, setUsers] = useState();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8585/api/users/getUsers')
      .then((usersRes) => {
        setUsers(usersRes.data);
        console.log('Users:', usersRes.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:8585/api/projects/getAllProjects')
      .then((projectsRes) => {
        setProjects(projectsRes.data);
        console.log('Projects:', projectsRes.data);
      })
      .catch((error) => {
        console.error('Error fetching projects:', error);
      });
  }, []);

  return (
    <>
      <Menu />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Cards/:categoryId" element={<Cards projects={projects} />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/AddProject" element={<AddProject />} />
        <Route path="/About" element={<About />} />
      </Routes>

      <Footer />
    </>
  );
}
