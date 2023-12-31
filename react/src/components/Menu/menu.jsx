import AppBar from '@mui/material/AppBar';
import React, { useState } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import MyMenu from './AppBar';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SuccessModal from '../Pages/SuccessModal'; 

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Menu() {
  const [alignment, setAlignment] = useState('web');
  const [openModal, setOpenModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false); 

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const nav = useNavigate();
  const user = useSelector((state) => state.user.currentUser);

  const handleAddProjectClick = () => {
    if (user != null) {
      nav('/addProject')
    } else {
      
      setOpenModal(true);
    }
  };

  const handleMyAccountClick = () => {
    if (user != null) {
      nav('/MyAccount')
    } else {
      
      setOpenModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    nav('/HomePage');
  };

  // Define the successButton object
  const successButton = {
    label: 'Back to Home Page',
    onClick: () => nav('/Signin'),
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
            <img src="/icons-avatar-16.png" alt="My Account" />
          </ToggleButton>
          <ToggleButton value="ios" onClick={handleAddProjectClick}>
            Add project
            <img src="/icons-add-16.png" alt="Add Project" />
          </ToggleButton>
          <ToggleButton value="ios" onClick={() => nav('/About')}>
            About
            <img src="/icons-about-16.png" alt="About" />
          </ToggleButton>
          <ToggleButton value="ios" onClick={() => nav('/SignIn')}>
            Sign In
            <img src="/icons-sign-in-16.png" alt="Sign In" />
          </ToggleButton>
        </ToggleButtonGroup>
      </AppBar>

      {/* Modal for unauthenticated user */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Sign In Required
            <img src="/sign-in.gif" alt="sign-in" />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Please sign in to add a project.
          </Typography>
          <Button onClick={handleCloseModal}>Close</Button>
          <Button onClick={() => {
            nav('/SignIn');
            setOpenModal(false);
          }}>
            Go to sign in!
          </Button>
        </Box>
      </Modal>

      {/* Success modal for authenticated user */}
      <SuccessModal
        open={showSuccessModal}
        onClose={handleSuccessModalClose}
        text1="Sign In Required"
        imageSrc="/sign-in.gif"
        text2="Please sign in to add a project."
        button={successButton}
      />
    </div>
  );
}
