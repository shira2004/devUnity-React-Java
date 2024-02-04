import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import ScrollToTopOnMount from '../Useful/ScrollToTopOnMount';
import { useSelector } from 'react-redux';
import ProjectCard from '../Useful/projectCard';

export default function Updates() {
  const allProjects = useSelector((state) => state.project.listProjects);
  const [latestProjects, setLatestProjects] = useState([]);
  const [mostActiveProjects, setMostActiveProjects] = useState([]);
  const nav = useNavigate();

  const handleCardClick = (project) => {
    console.log(mostActiveProjects);
    console.log(project.user);
     nav('/Details', { state: { project: project } });
  };

  useEffect(() => {
    const sortedProjects = [...allProjects]
      .filter((project) => project.status == 1)
      .sort((a, b) => new Date(b.endDate) - new Date(a.endDate));
    const latestSixProjects = sortedProjects.slice(0, 3);
    setLatestProjects(latestSixProjects);

    const sortedMostActiveProjects = [...allProjects]
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
    setMostActiveProjects(sortedMostActiveProjects);
  }, [allProjects]);

  return (
    <>
      <ScrollToTopOnMount />
      <Header />
      <Typography component="div" style={{ fontWeight: 'bold' }}>
        <h2>🚀 Exciting Updates: Dive into the DevUnity Buzz! 🎉</h2>
        <p>
          Hey DevUnity Explorers! 🌍 <br/>Ready for some exciting news from the
          heart of our vibrant community? <br/>Buckle up because here's the latest
          scoop on the successfully completed and popular projects <br/>that are setting DevUnity on fire!🔥
        </p>
      </Typography>
      <br />

      {latestProjects.length > 0 && (
        <>
          <p>🛠 Latest Successfully Completed Projects</p>
          <img src="/icon-line.png" alt="icon-line" />
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
          {latestProjects.map((project) => (
             <ProjectCard
             project={project}
             showLearnMoreButton={false}
           />
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
             <ProjectCard
             project={project}
             onCardClick={handleCardClick}
             showLearnMoreButton={true}
           />
            ))}
          </Box>
        </>
      )}
      <Typography component="div">
        <p>
          Stay tuned for more updates, contributions, and epic collaborations!<br />
          🚀 DevUnity is where innovation meets fun <br/> join us in shaping the
          future of creative development. 🎨✨
        </p>
      </Typography>
    </>
  );
}
