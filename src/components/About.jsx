import React from 'react';
import Section from '../components/Body/HomePage/Section/Section1';
import Section2 from '../components/Body/HomePage/Section/Section2';
import Server from '/server.png';
import feeling_proud from '/feeling_proud.png';
import Friends_online from '/Friends_online.png';
import Community from '/Community.png';
import Business_deal from '/Business_deal.png';
import collaboration from '/collaboration.png';
import Type  from '/Type.png';
import { useNavigate } from 'react-router-dom';

export default function About() {
  const nav = useNavigate();
  return (
    <>
     <br/><br/><br/><br/><br/><br/>
    <br/><br/><br/>
    
    <Section
  title="Empowering Innovators, Uniting Creators"
  description="At the heart of the digital realm, DevUnity stands as a beacon for innovators, creators, and developers seeking a collaborative and passionate community. More than a platform, DevUnity is an ecosystem meticulously crafted to elevate the world of open-source and creative development."
  buttonText=""
  imageSrc={collaboration}
  onClick={() => nav('/SignUp')}
  customStyle={{ display: 'none' }}
/>

    <br/><br/><br/><br/><br/><br/>
    <br/>
    <Section2
  title="Our Purpose:"
  description="DevUnity was born from a vision to create a space where technological enthusiasts, developers, and visionaries could converge, collaborate, and push the boundaries of what's possible. Our mission is to empower individuals to contribute, learn, and make a positive impact on the world of coding and development."
  buttonText=""
  imageSrc={feeling_proud}
  onClick={() => nav('/AddProject')}
  customStyle={{ display: 'none' }}
/>

    <br/><br/><br/><br/><br/><br/>
    <br/>
    <Section
        title="Key Objectives:"
        description="Fostering Collaboration: DevUnity serves as a hub for collaboration, connecting like-minded individuals with diverse talents and skills. By fostering a collaborative environment, we believe in the collective power to shape cutting-edge projects.
        Knowledge-Sharing: Our platform is a repository of knowledge where learning is a continuous journey. DevUnity encourages the sharing of insights, experiences, and skills, creating a dynamic space for personal and professional growth.
        Innovation Without Bounds: Breaking free from conventional constraints, DevUnity is committed to fostering innovation without bounds. We believe in pushing the limits of what technology can achieve and encouraging our community to think outside the box."
        buttonText=""
        imageSrc={Business_deal}
        onClick={() => nav('/AddProject')}
        customStyle={{ display: 'none' }}
      />
    


    <br/><br/><br/><br/><br/><br/>
    <br/>
    <Section2
        title="Our Community:"
        description="DevUnity thrives on the diversity of its community. From developers and tech enthusiasts to creatives and visionaries, our members come together to form a rich tapestry of talents. The collective drive of our community members shapes the technological landscape and drives advancements in various fields."
        buttonText=""
        imageSrc={Friends_online}
        onClick={() => nav('/AddProject')}
        customStyle={{ display: 'none' }}

      />

    <br/><br/><br/><br/><br/><br/>
    <br/>
    <Section
        title="Why DevUnity?"
        description="Connectivity: DevUnity provides a platform for individuals to connect, collaborate, and form meaningful partnerships.

        Learning Hub: Our platform is a perpetual learning hub, offering resources, tutorials, and opportunities for skill enhancement.
        
        Innovation Hub: DevUnity is not just a platform; it's an innovation hub where ideas flourish, projects come to life, and technology is advanced by a community of passionate individuals."
        buttonText=""
        imageSrc={Type}
        onClick={() => nav('/AddProject')}
        customStyle={{ display: 'none' }}
      />

    <br/><br/><br/><br/><br/><br/>
    <br/>
    <Section2
        title="Join DevUnity:"
        description="Whether you're a seasoned developer, a creative mind, or a tech enthusiast, DevUnity welcomes you to join this dynamic community. Together, let's redefine the landscape of coding and development. Welcome to DevUnity – where innovation knows no bounds!"
        buttonText=""
        imageSrc={Server}
        onClick={() => nav('/AddProject')}
        customStyle={{ display: 'none' }}
        

      />
    
    </>
    
  )
}
