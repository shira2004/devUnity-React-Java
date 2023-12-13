import React from 'react';
import logo from '/logo_git_r.png'; 
import './Header.css'
import { useNavigate } from 'react-router-dom';
export default function Header() {
  const nav=useNavigate()
  return (
    <header>
          <img src={logo} className="logo devUnity" alt="devUnity logo" onClick={()=>{nav('/HomePage')}}  />
          <h1>DevUnity</h1>
           <p>Collaborate, Code, Contribute.</p>
      
    </header>
  );
}


