import React from 'react';
import Section from '../Useful/Section/Section1';
import Section2 from '../Useful/Section/Section2';
import Server from '/server.png';
import feeling_proud from '/feeling_proud.png';
import Friends_online from '/Friends_online.png';
import Business_deal from '/Business_deal.png';
import collaboration from '/collaboration.png';
import Type  from '/Type.png';
import { useNavigate } from 'react-router-dom';
import ScrollToTopOnMount from '../Useful/ScrollToTopOnMount';

export default function About() {
  const nav = useNavigate();
  return (
    <>
    <ScrollToTopOnMount/>
     <br/><br/><br/><br/><br/><br/>
    <br/><br/><br/>
    
    <Section
  title="Fork the Repository and Create a New Branch:"
  description="Before making any contributions, fork the project's repository on GitHub. This creates a copy of the repository under your account. Create a new branch for your specific contributions. This allows you to work on your changes without affecting the main branch."
  buttonText=""
  imageSrc={collaboration}
  onClick={() => nav('/SignUp')}
  customStyle={{ display: 'none' }}
/>

    <br/><br/><br/><br/><br/><br/>
    <br/>
    <Section2
  title="Follow Coding Standards and Conventions:"
  description="Consistency is crucial for collaborative projects. Adhere to the coding standards and conventions established by the project. This includes aspects like naming conventions, indentation, and other style guidelines. By following these standards, your code integrates seamlessly with the existing codebase."
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
