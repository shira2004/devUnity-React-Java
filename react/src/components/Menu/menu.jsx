import AppBar from '@mui/material/AppBar';
import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import MyMenu from './AppBar'
import { useNavigate } from 'react-router-dom';



export default function menu() {
  const [alignment, setAlignment] = React.useState('web');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const nav=useNavigate()

  return (
    <AppBar sx={{ marginTop: '7px', backgroundColor: 'white', boxShadow: 'none' }}>
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="web">
     <MyMenu/>
     </ToggleButton>
      <ToggleButton value="ios" onClick={()=>{nav('/MyAccount')}}>
        My account
        <img src="/icons-avatar-16.png" alt="Add Project" />
        </ToggleButton>
      <ToggleButton value="ios" onClick={()=>{nav('/AddProject')}}>
      add project
      <img src="/icons-add-16.png"  />
      </ToggleButton>
      <ToggleButton value="ios" onClick={()=>{nav('/About')}}>
        About
        <img src="/icons-about-16.png"  />
        </ToggleButton>
        <ToggleButton value="ios" onClick={()=>{nav('/SignIn')}}>
        sign
        <img src="/icons-sign-in-16.png"  />
        </ToggleButton>
    </ToggleButtonGroup>
    </AppBar>
  );
}