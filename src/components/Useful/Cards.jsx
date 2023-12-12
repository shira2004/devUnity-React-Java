import React from 'react';
import Header from '../Header/Header';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import logo from '/logo_git_r.png'; // Adjust the path accordingly

const Cards = ({ projects }) => {
  console.log('i am data and i am in cards:', projects);
  return (
    <>
    
      <Header />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        {projects && projects.map((project) => (
          <Card key={project.id} sx={{ maxWidth: 345, margin: 2 }}>
            {/* Use the correct property names */}
            <CardMedia
              sx={{ height: 300 }}
              image={project.url || logo} // Assuming 'url' contains the image URL
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
            </CardActions>
          </Card>
        ))}
      </Box>
    </>
  );
};

export default Cards;
