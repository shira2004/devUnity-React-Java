import React from 'react';
import Header from '../Header/Header';
import Box from '@mui/material/Box';
import { useLocation , useNavigate} from 'react-router-dom';
import ScrollToTopOnMount from '../Useful/ScrollToTopOnMount';
import ProjectCard from './projectCard';


const Cards = () => {
  const location = useLocation();
  const filteredProjects = location.state
  const nav = useNavigate();

  const handleCardClick = (project) => {
    nav('/Details', { state: { project: project } });
  };


  return (
    <>
    <ScrollToTopOnMount/>
      <Header />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        {filteredProjects.map((project) => (
         <ProjectCard
         project={project}
         onCardClick={handleCardClick}
         showLearnMoreButton={true}
       />
        ))}
      </Box>
      
    </>
  );
};

export default Cards;
