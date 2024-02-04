import AppBar from '@mui/material/AppBar';
import React, { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import MyMenu from './AppBar';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SuccessModal from '../Pages/SuccessModal';


const imageStyle = {
  paddingLeft: '12px', 
};

export default function Menu() {
  const [alignment, setAlignment] = useState('web');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const nav = useNavigate();
  const user = useSelector((state) => state.user.currentUser);


  const handleMyAccountClick = () => {
    if (user != null) {
      nav('/MyAccount')
    } else {

      setShowSuccessModal(true);
    }
  };

  const handleAddProjectClick = () => {
    if (user != null) {
      nav('/AddProject')
    } else {

      setShowSuccessModal(true);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    nav('/HomePage');
  };

  const successButton = {
    label: 'sign in',
    onClick: () => {
      handleSuccessModalClose();
      nav('/Signin');
    },
  };

  return (
    <div>
      <AppBar sx={{ marginTop: '7px', backgroundColor: 'white', boxShadow: 'none' }}>
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value="web">
            <MyMenu />
          </ToggleButton>
          <ToggleButton value="ios" onClick={handleMyAccountClick}>
              My account 
            <img src="/icons-avatar-16.png" alt="My Account" style={imageStyle} />
          </ToggleButton>
          <ToggleButton value="ios" onClick={handleAddProjectClick}>
            Add project
            <img src="/icons-add-16.png" alt="Add Project" style={imageStyle} />
          </ToggleButton>
          <ToggleButton value="ios" onClick={() => nav('/Updates')}>
            Updates
            <img src="/icon-news.png" alt="Updates"  style={imageStyle}/>
          </ToggleButton>
          <ToggleButton value="ios" onClick={() => nav('/About')}>
            About
            <img src="/icons-about-16.png" alt="About" style={imageStyle} />
          </ToggleButton>
          <ToggleButton value="ios" onClick={() => nav('/SignIn')}>
          {user ? (
              `${user.firstName} ${user.lastName} `
            ) : (
              " Sign In"
            )}
           
            <img src="/icons-sign-in-16.png" alt="Sign In"  style={imageStyle}/>
          </ToggleButton>

        </ToggleButtonGroup>
      </AppBar>



      <SuccessModal
        open={showSuccessModal}
        onClose={handleSuccessModalClose}
        text1="Exciting Next Step Awaits!"
        imageSrc="/sign-in.gif"
        text2="To proceed, we invite you to register with your account. 🌟"
        button={successButton}
      />

    </div>
  );
}
