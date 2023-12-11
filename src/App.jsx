import React,{useState} from 'react'
import SignUp from './components/sign/SignUp'
import Footer from './components/Body/Footer'
import SignIn from './components/sign/SignIn';
import { Routes, Route, Navigate } from 'react-router-dom';
import Cards from './components/Cards'
import Menu from './components/Body/menu';
import HomePage from './components/Body/HomePage/HomePage';
import AddProject from './components/AddProject/AddProject'
import About from './components/About'
import axios from 'axios'


import '../src/index.css'
import { useEffect } from 'react';

export default function App() {
  const [users, setUsers] = useState();
  useEffect(() => {
    axios.get('http://localhost:8585/api/users/getUsers')
      .then((usersRes) => {
        setUsers(usersRes.data); // Assuming the data is stored in the 'data' property
        console.log(usersRes.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []); // Make the request only once when the component mounts
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
         <Route path="/About" element={<About/>} /> 
         
      </Routes> 

      <Footer/> 
      
    </>
  );
}
