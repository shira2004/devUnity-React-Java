import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import AccountCircle from '/account-circle.png';
import BasicCard from '../Useful/BasicCard';
import { Grid } from '@mui/material';

// Fake data for demonstration purposes
const fakeProjects = [
  { id: 1, title: 'Project 1', subtitle: 'Subtitle 1', description: 'Description 1' },
  { id: 2, title: 'Project 2', subtitle: 'Subtitle 2', description: 'Description 2' },
  // Add more projects as needed
];

const fakeFavoriteProjects = [
  { id: 3, title: 'Favorite Project 1', subtitle: 'Favorite Subtitle 1', description: 'Favorite Description 1' },
  { id: 4, title: 'Favorite Project 2', subtitle: 'Favorite Subtitle 2', description: 'Favorite Description 2' },
  // Add more favorite projects as needed
];

export default function MyAccount() {
  const [userProjects, setUserProjects] = useState([]);
  const [favoriteProjects, setFavoriteProjects] = useState([]);

  useEffect(() => {
    // Fetch user projects from the server
    // Replace the following line with your actual API call
    // getProjectsByUser(userId).then((projects) => setUserProjects(projects));
    setUserProjects(fakeProjects);

    // Fetch favorite projects from the server
    // Replace the following line with your actual API call
    // getFavoriteProjectsByUser(userId).then((favoriteProjects) => setFavoriteProjects(favoriteProjects));
    setFavoriteProjects(fakeFavoriteProjects);
  }, []); // Fetch data on component mount

  return (
    <>
      <Header  />
      {/* additionalPicture={AccountCircle} */}
      <Grid container spacing={8} justifyContent="center">
        <Grid item xs={10} sm={6} md={3}>
          <BasicCard title="My Projects" projects={userProjects} />
        </Grid>
        <Grid item xs={10} sm={6} md={3}>
          <BasicCard title="Favorite Projects" projects={favoriteProjects} />
        </Grid>
      </Grid>
    </>
  );
}
