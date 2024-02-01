import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Menu from './components/Menu/menu';
import HomePage from './components/Pages/HomePage';
import SignIn from './components/Pages/sign/SignIn';
import SignUp from './components/Pages/sign/SignUp';
import Cards from './components/Useful/Cards';
import About from './components/Pages/About';
import Footer from './components/Footer';
import MyAccount from './components/Pages/MyAccount';
import HorizontalLinearStepper from './components/Feature/AddProject/steps/managerSteps';
import Details from './components/Pages/Blog/blog';
import CommentList from './components/Useful/CommentList';
import Edit from './components/Pages/Edit';
import '../src/index.css';
import Updates from './components/Pages/Updates';

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
   
    dispatch({ type: 'GET_CATEGORY' });
    dispatch({ type: 'GET_PROJECTS' });
    dispatch({ type: 'GET_COMMENTS' });
    dispatch({ type: 'GET_CONTENTS' });
  }, [dispatch]);
  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Cards" element={<Cards  />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/AddProject" element={<HorizontalLinearStepper />} />
        <Route path="/About" element={<About />} />
        <Route path="/MyAccount" element={<MyAccount />} />
        <Route path="/Details" element={<Details  />} />
        <Route path="/CommentList" element={<CommentList />} />
        <Route path="/Edit" element={<Edit />} />
        <Route path="/Updates" element={<Updates />} />

      </Routes>
      <Footer />
    </>
  );
}
