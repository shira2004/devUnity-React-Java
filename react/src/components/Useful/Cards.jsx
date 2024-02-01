import React ,{useEffect}from 'react';
import Header from '../Header/Header';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ScrollToTopOnMount from '../Useful/ScrollToTopOnMount';
import ProjectCard from './projectCard';


const Cards = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const filteredProjects = location.state
  const nav = useNavigate();

  const handleCardClick = (project) => {
    nav('/Details', { state: { project: project } });
  };

  const handleLikeClick = (project) => {
    dispatch({
      type: 'INCREMENT_VIEWER_COUNT',
      payload: {
        id: project.id,
      },
    });
  };

  useEffect(() => {
    console.log('Filtered Projects Updated:', filteredProjects);
  }, [filteredProjects]);


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
