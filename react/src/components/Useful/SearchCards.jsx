import React from 'react';
import Header from '../Header/Header';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Cards = () => {
  const location = useLocation();
  const filteredProjects = location.state
  const nav = useNavigate();

  const handleCardClick = (project) => {
    nav('/Details', { state: { project: project } });
  };

  return (
    <>
      <Header />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
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
                Learn More
              </Button>
              <span className="material-symbols-outlined">visibility</span>
            </CardActions>
          </Card>
        ))}
      </Box>
    </>
  );
};

export default Cards;
