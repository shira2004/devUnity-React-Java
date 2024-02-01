import React, { useState, useEffect } from 'react';
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
import { useSelector } from 'react-redux';

export default function Updates() {
  const allProjects = useSelector((state) => state.project.listProjects);
  const [latestProjects, setLatestProjects] = useState([]);
  const [mostActiveProjects, setMostActiveProjects] = useState([]);
  const nav = useNavigate();

  const handleCardClick = (project) => {
    nav('/Details', { state: { project: project } });
  };

  useEffect(() => {
    const sortedProjects = [...allProjects]
      .filter((project) => project.status == 1)
      .sort((a, b) => new Date(b.endDate) - new Date(a.endDate));
    const latestSixProjects = sortedProjects.slice(0, 6);
    setLatestProjects(latestSixProjects);

    const sortedMostActiveProjects = [...allProjects]
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);
    setMostActiveProjects(sortedMostActiveProjects);
  }, [allProjects]);

  return (
    <>
      <ScrollToTopOnMount />
      <Header />
      <Typography component="div">
        <h2>🚀 Exciting Updates: Dive into the DevUnity Buzz! 🎉</h2>
        <p>

          Hey DevUnity Explorers! 🌍 Ready for some exciting news from the
          heart of our vibrant community? Buckle up because here's the latest
          scoop on the successfully completed and popular projects that are setting DevUnity on fire!🔥
        </p>
      </Typography>
      <br />

      {latestProjects.length > 0 && (
        <>
          <p>🛠 Latest Successfully Completed Projects</p>
          <img src="/icon-line.png" alt="icon-line" />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
            {latestProjects.map((project) => (
              <Card key={project.id} sx={{ maxWidth: 345, margin: 2 }}>
                <img src="/medal.png" alt="medal" />
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
      {mostActiveProjects.length > 0 && (
        <>
          <p>🔥 Hot and Trending: Most Active Projects</p>
          <img src="/icon-line.png" alt="icon-line" />

          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
            {mostActiveProjects.map((project) => (
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
                </CardActions>
              </Card>
            ))}
          </Box>
        </>
      )}
      <Typography component="div">
        <p>
          Stay tuned for more updates, contributions, and epic collaborations!
          🚀 DevUnity is where innovation meets fun – join us in shaping the
          future of creative development. 🎨✨
        </p>
      </Typography>
    </>
  );
}
