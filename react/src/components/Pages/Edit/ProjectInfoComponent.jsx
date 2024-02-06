
import React from "react";
import { format } from "date-fns";
import { CardContent, Typography, Rating } from "@mui/material";

const ProjectInfoComponent = ({ project, len }) => {
  return (
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {format(project.date, 'dd/MM/yy')}
      </Typography>

      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {project.user.firstName} {project.user.lastName}
      </Typography>

      <Typography variant="h5" component="div">
        {project.title}
      </Typography>

      <Typography sx={{ mb: 1.5 }} color="text.secondary">
        <Rating name="read-only" size='small' value={project.score === 0 ? 0 : (project.score) / len} readOnly />
      </Typography>

      <Typography variant="body2">
        {project.description}
      </Typography>

      <Typography variant="body2">
        <img src="/github-logo.png" alt="My Account" /><br />
        <strong>{project.url}</strong>
      </Typography>

      <br /><br /><br />
      <Typography variant="body2">
        <img
          src={`data:image/*;base64,${project.image}`}
          alt="Project Image"
          style={{ width: '100%', height: 'auto' }}
        />
      </Typography>
    </CardContent>
  );
};

export default ProjectInfoComponent;
