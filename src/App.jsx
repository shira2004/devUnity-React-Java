import React from 'react'
import SignUp from './components/sign/SignUp'
import Footer from './components/Body/Footer'
import SignIn from './components/sign/SignIn';
import { Routes, Route, Navigate } from 'react-router-dom';
import Cards from './components/Cards'
import Menu from './components/Body/menu';
import HomePage from './components/Body/HomePage/HomePage';
import AddProject from './components/AddProject/AddProject'


import '../src/index.css'

export default function App() {
  return (
    <>

    {/* <AddProject/> */}
      <Menu/>
     
    
         <Routes> 
         <Route path="/" element={<HomePage/>} /> 
         <Route path="/SignIn" element={<SignIn/>}/> 
         <Route path= "/SignUp" element={<SignUp/> }/> 
         <Route path='/Cards' element={<Cards/>}/>
         <Route path="/HomePage" element={<HomePage/>} /> 
         <Route path="/AddProject" element={<AddProject/>} /> 
         
      </Routes> 

      <Footer/> 
      
    </>
  );
}
