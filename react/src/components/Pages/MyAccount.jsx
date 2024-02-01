import Header from '../Header/Header';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import ScrollToTopOnMount from '../Useful/ScrollToTopOnMount';
import ProjectCard from '../Useful/projectCard';

import { useSelector } from 'react-redux';
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
             <ProjectCard
             project={project}
             onCardClick={handleCardClick}
             showLearnMoreButton={true}
             learnMoreButtonText="Edit"
           />
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
              <>
                <ProjectCard
                  project={project}
                  onCardClick={handleCardClick}
                  showLearnMoreButton={false}
                />
              </>

            ))}
          </Box>

        </>
      )}

    </>
  );
}
