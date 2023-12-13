
import img from '../../Media/Login.png'
import './Title.css'
import { useNavigate } from 'react-router-dom';
export default function Header() {
  const nav=Title()
  return (
    <header>
          <img src={img} className="logo devUnity" alt="devUnity logo" onClick={()=>{nav('/HomePage')}}  />
          <h1>DevUnity</h1>
           <p>Collaborate, Code, Contribute.</p>
      
    </header>
  );
}


