import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Slider from 'react-slick';  
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';
import ScrollToTopOnMount from '../Useful/ScrollToTopOnMount';


import { useDispatch, useSelector } from 'react-redux';

export default function MyAccount() {
  const projects  = useSelector((state) => state.project.listProjects);
  const user = useSelector((state) => state.user.currentUser);
  const filteredProjects = projects.filter((project) => project.user.id === user.id);
  console.log('i in my account', filteredProjects);
  console.log(filteredProjects);
  const nav = useNavigate();


  const settings = {
    dots: true,
    infinite: true,
    // slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
    cssEase: "linear"
}
const handleCardClick = (project) => {
  nav('/Edit', { state: { project: project } });
};

  return (
    <>
     <ScrollToTopOnMount/>
      <Header  />
      <Typography>
      <img src="/icons-avatar-80.png" alt="my account" />
      </Typography>
      <Typography>
       {user.firstName}   {user.lastName}
      </Typography>
       

      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
      {/* <Slider {...settings}> */}
        {filteredProjects.map((project) => (
          <Card key={project.id} sx={{ maxWidth: 345, margin: 2 }}>
            <CardMedia
              sx={{ height: 200 }}
              image={`data:image/*;base64,${project.image}`}
              title={project.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {project.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {project.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => handleCardClick(project)}>
                edit project
              </Button>
             
            </CardActions>
          </Card>
        ))}
        {/* </Slider> */}
      </Box>

    </>
  );
}
