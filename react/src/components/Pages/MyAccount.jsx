import Header from '../Header/Header';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import ScrollToTopOnMount from '../Useful/ScrollToTopOnMount';

import { useDispatch, useSelector } from 'react-redux';
export default function MyAccount() {
  const projects = useSelector((state) => state.project.listProjects);
  const user = useSelector((state) => state.user.currentUser);
  const currentProjects = projects.filter((project) => project.user.id === user.id && project.status == 0);
  const prevProjects = projects.filter((project) => project.user.id === user.id && project.status == 1);


  const nav = useNavigate();

  const handleCardClick = (project) => {
    console.log("im in project");
    nav('/Edit', { state: { project: project } });
  };

  return (
    <>
      <ScrollToTopOnMount />
      <Header />
      <Typography>
        <img src="/icons-avatar-80.png" alt="my account" />
      </Typography>
      <Typography>
        <p>
          {user.firstName}   {user.lastName}
        </p>
      </Typography>
      <br />

      {currentProjects.length > 0 && (
        <>
          <p>my projects</p>
          <img src="/icon-line.png" alt="my account" />

          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
            {currentProjects.map((project) => (
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
          </Box>
        </>
      )}
      {prevProjects.length > 0 && (
        <>
          <p>prev projects</p>
          <img src="/icon-line.png" alt="my account" />

          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
            {prevProjects.map((project) => (
              <Card key={project.id} sx={{ maxWidth: 345, margin: 2 }}>
                <img src="/medal.png" alt="my account" />
                <CardMedia
                  sx={{ height: 150 }}
                  image={`data:image/*;base64,${project.image}`}
                  title={project.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h8" component="div">
                    {project.title}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </>
      )}

    </>
  );
}
