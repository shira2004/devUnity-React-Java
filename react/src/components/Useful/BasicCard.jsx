import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const BasicCard = ({ title, projects }) => {
  const [additionalData, setAdditionalData] = useState(null);

  useEffect(() => {

  }, [projects]);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        {projects && projects.length > 0 ? (
          projects.map((project) => (
            <div key={project.id}>
              <Typography color="text.secondary">{project.subtitle}</Typography>
              <Typography variant="body2">{project.description}</Typography>
              {/* Add more fields as needed */}
            </div>
          ))
        ) : (
          <Typography variant="body2">No projects available</Typography>
        )}
      </CardContent>
      <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                see more
              </Button>
    </Card>
  );
};

export default BasicCard;
