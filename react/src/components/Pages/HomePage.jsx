import React,{useState} from 'react';
import Carusel from '../Body/HomePage/Carusel/Carusel'
import Quotes from '../Body/HomePage/Quotes'
import Video from '../Body/HomePage/Video'
import Section from '../Useful/Section/Section1';
import Section2 from '../Useful/Section/Section2';
import AddImg from '../../assets/Add.png';
import teamImage from '../../assets/team.png';
import website from '../../assets/website.png';
import { useNavigate } from 'react-router-dom';
import ScrollToTopOnMount from '../Useful/ScrollToTopOnMount';
import { useSelector } from 'react-redux';
import Modal from '@mui/material/Modal';
import SuccessModal from '../Pages/SuccessModal'; 
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

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

export default function HomePage() {
  const nav = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false); 
  const user = useSelector((state) => state.user.currentUser);

  const handleAddProjectClick = () => {
    if (user != null) {
      
      nav('/addProject')
    } else {
      // Open the modal for unauthenticated user
      setOpenModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSuccessModalClose = () => {
    // Close the success modal
    setShowSuccessModal(false);
    // Redirect to /HomePage after closing modal
    nav('/HomePage');
  };

  // Define the successButton object
  const successButton = {
    label: 'Back to Home Page',
    onClick: () => nav('/Signin'),
  };

  
  return (
    <>
    <ScrollToTopOnMount/>
    <Carusel/>
    <Quotes/>
    <Video/>
    <br/><br/><br/><br/><br/><br/>
    <Section
        title="Join Our Community"
        description="Explore the realm of developers and programmers at DevUnity. Join our dynamic community and leverage your unique skills to contribute, learn, and collaborate with experts from around the world. Opportunities are limitless - dive in now!"
        buttonText="Join DevUnity"
        imageSrc={teamImage}
        onClick={() => nav('/SignUp')}
      />
    <br/><br/><br/><br/><br/><br/>
    <br/><br/><br/>
    <Section2
        title="Add Your Latest Project to the DevUnity"
        description="Calling all existing members! Elevate your profile by uploading your latest project to the repository. Showcase your skills, contribute to our growing community, and keep the innovation flowing. Add your project now and make your mark in the DevUnity database!"
        buttonText="Add a new project"
        imageSrc={AddImg}
        onClick={handleAddProjectClick}

      />

    <br/><br/><br/><br/><br/><br/>
    <br/><br/><br/>
    <Section
        title="Discover the Heart of DevUnity"
        description="Discover the heart of DevUnity! Delve into the story of our vibrant community, where innovation meets collaboration. Learn about the mission driving developers, creators, and collaborators worldwide. Join us in shaping the future of open-source and creative development. Explore 'About' now to uncover the essence of DevUnity."
        buttonText="Explore DevUnity"
        imageSrc={website}
        onClick={() => nav('/About')}
      />



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
    
    </>
    
  );
}
