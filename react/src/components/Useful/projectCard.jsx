import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ProjectCard({ project, onCardClick, maxWidth, showLearnMoreButton, learnMoreButtonText }) {
  return (
    <Card key={project.id} sx={{ maxWidth: maxWidth || 345, margin: 2 }}>
      <CardMedia sx={{ height: 200 }} image={`data:image/*;base64,${project.image}`} title={project.title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {project.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {project.description}
        </Typography>
      </CardContent>
      <CardActions>
        {showLearnMoreButton && (
          <Button size="small" onClick={() => onCardClick(project)}>
            {learnMoreButtonText || 'Learn More'}
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
