import React from 'react';
import Carusel from './Carusel/Carusel'
import Quotes from './Quotes'
import Video from './Video'
import Section from './Section/Section1';
import Section2 from './Section/Section2';
import AddImg from '/Add.png';
import teamImage from '/team.png';
import website from '/website.png';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const nav = useNavigate();
  return (
    <>
    
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
        onClick={() => nav('/AddProject')}

      />

    <br/><br/><br/><br/><br/><br/>
    <br/><br/><br/>
    <Section
        title="Discover the Heart of DevUnity"
        description="Discover the heart of DevUnity! Delve into the story of our vibrant community, where innovation meets collaboration. Learn about the mission driving developers, creators, and collaborators worldwide. Join us in shaping the future of open-source and creative development. Explore 'About' now to uncover the essence of DevUnity."
        buttonText="Explore DevUnity"
        imageSrc={website}
        onClick={() => nav('/AddProject')}
      />
    
    </>
    
  )
}
