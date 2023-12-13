// Cards.jsx
import React from 'react';
import Header from '../Header/Header';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import logo from '/logo_git_r.png'; 
import { useLocation } from 'react-router-dom';
// import { Rating } from '@mui/material';


const Cards = () => {
  const location = useLocation();
  const projects = location.state?.projects || [];

  console.log('Projects:', projects);

  return (
    <>
      <Header />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        {projects.map((project) => (
          <Card key={project.id} sx={{ maxWidth: 345, margin: 2 }}>
            <CardMedia
              sx={{ height: 300 }}
              image={project.url || logo}
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
              <Button size="small">Learn More</Button>
              <span className="material-symbols-outlined">visibility</span>
              {/* <Rating/> */}
            </CardActions>
          </Card>
        ))}
      </Box>
    </>
  );
};

export default Cards;
