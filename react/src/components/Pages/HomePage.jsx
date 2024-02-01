import React, { useState } from 'react';
import Carusel from '../Body/HomePage/Carusel/Carusel';
import Quotes from '../Body/HomePage/Quotes';
import Video from '../Body/HomePage/Video';
import Section from '../Useful/Section/Section1';
import Section2 from '../Useful/Section/Section2';
import AddImg from '/Add.png';
import teamImage from '/team.png';
import website from '/website.png';
import { useNavigate } from 'react-router-dom';
import ScrollToTopOnMount from '../Useful/ScrollToTopOnMount';
import { useSelector } from 'react-redux';
import SuccessModal from '../Pages/SuccessModal';


export default function HomePage() {
  const nav = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const user = useSelector((state) => state.user.currentUser);

  const handleAddProjectClick = () => {
    if (user !== null) {
      nav('/addProject');
    } else {
      setShowSuccessModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  const successButton = {
    label: 'sign in ',
    onClick: () => {
      handleCloseModal();
      nav('/Signin');
    },
  };

  return (
    <>
      <ScrollToTopOnMount />
      <Carusel />
      <Quotes />
      <Video />
      <div style={{paddingTop:"100px"}} >

      <Section
        title="Join Our Community"
        description="Explore the realm of developers and programmers at DevUnity. Join our dynamic community and leverage your unique skills to contribute, learn, and collaborate with experts from around the world. Opportunities are limitless - dive in now!"
        buttonText="Join DevUnity"
        imageSrc={teamImage}
        onClick={() => nav('/SignUp')}
        />
        </div>
        <div style={{paddingTop:"200px"}} >
      <Section2
        title="Add Your Latest Project to DevUnity"
        description="Calling all existing members! Elevate your profile by uploading your latest project to the repository. Showcase your skills, contribute to our growing community, and keep the innovation flowing. Add your project now and make your mark in the DevUnity database!"
        buttonText="Add a new project"
        imageSrc={AddImg}
        onClick={handleAddProjectClick}
      />
     </div>
     <div style={{paddingTop:"200px"}} >
      <Section
        title="Discover the Heart of DevUnity"
        description="Discover the heart of DevUnity! Delve into the story of our vibrant community, where innovation meets collaboration. Learn about the mission driving developers, creators, and collaborators worldwide. Join us in shaping the future of open-source and creative development. Explore 'About' now to uncover the essence of DevUnity."
        buttonText="Explore DevUnity"
        imageSrc={website}
        onClick={() => nav('/About')}
        />
        </div>

      <SuccessModal
        open={showSuccessModal}
        onClose={handleCloseModal}
        text1="Sign In Required"
        imageSrc="/sign-in.gif"
        text2="Please sign in to add a project."
        button={successButton}
      />
    </>
  );
}
