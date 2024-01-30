import React from 'react';
import logo from '/logo_git_r.png';
import './Header.css';
import { useNavigate } from 'react-router-dom';

export default function Header({ additionalPicture }) {
  const nav = useNavigate();

  return (
    <header>
      <div className="logo-container">
        {additionalPicture && (
          <img src={additionalPicture} className="logo" alt="Additional Picture" />
        )}
        <img src={logo} className="logo devUnity" alt="devUnity logo" onClick={() => { nav('/HomePage') }} />
      </div>
      <h1>DevUnity</h1>
      <p>Collaborate, Code, Contribute.</p>
    </header>
  );
}
