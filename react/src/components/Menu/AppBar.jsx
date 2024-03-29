import React, { useState } from 'react';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Drawer from '@mui/joy/Drawer';
import Input from '@mui/joy/Input';
import List from '@mui/joy/List';
import ListItemButton from '@mui/joy/ListItemButton';
import Typography from '@mui/joy/Typography';
import ModalClose from '@mui/joy/ModalClose';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function MyMenu() {


  const categories = useSelector((state) => state.categories.ListCategories);
  const projects = useSelector((state) => state.project.listProjects);

  const imageStyle = {
    transition: 'filter 0.3s ease-out', 
    
  };
  
  const hoverStyle = {
    filter: 'drop-shadow(0 0 2em #646cff)', 
  };


  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('')
  const [isHovered, setIsHovered] = useState(false);
  
  const handleCategoryClick = (id) => {
    const proj = projects.filter(p => p.status === 0)
    console.log('this is proj status 0');
    console.log(proj);
    const filteredProjects = projects.filter((project) => project.category.id === id && project.status === 0);
    console.log(filteredProjects);
    nav('/Cards', { state: filteredProjects });
    setOpen(false);

  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchIconClick = () => {
    setOpen(false);
    const filteredProjects = projects.filter((project) =>
      project.status !== 1 &&
      project.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    nav('/Cards', { state: filteredProjects });
  }
  return (
    <>
      <React.Fragment>
        <IconButton variant="outlined" color="neutral" onClick={() => {
          setOpen(true);
        }}>
          <img src="/icons-menu-16.png" alt="Menu" />
        </IconButton>
        <Drawer open={open} onClose={() => setOpen(false)}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              ml: 'auto',
              mt: 1,
              mr: 2,
            }}
          >
            <Typography
              component="label"
              htmlFor="close-icon"
              fontSize="sm"
              fontWeight="lg"
              sx={{ cursor: 'pointer' }}
            >
              Close
            </Typography>
            <ModalClose id="close-icon" sx={{ position: 'initial' }} />
          </Box>
          <Input
            size="sm"
            placeholder="Search"
            onChange={handleSearchChange}
            variant="plain"
            endDecorator={<img
              src="/icons-search-32.png"
              alt="Search"
              style={{ ...imageStyle, ...(isHovered && hoverStyle) }}
              onClick={handleSearchIconClick}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />}
            slotProps={{
              input: {
                'aria-label': 'Search anything',
              },
            }}
            sx={{
              m: 3,
              borderRadius: 0,
              borderBottom: '2px solid',
              borderColor: 'neutral.outlinedBorder',
              '&:hover': {
                borderColor: 'neutral.outlinedHoverBorder',
              },
              '&::before': {
                border: '1px solid var(--Input-focusedHighlight)',
                transform: 'scaleX(0)',
                left: 0,
                right: 0,
                bottom: '-2px',
                top: 'unset',
                transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
                borderRadius: 0,
              },
              '&:focus-within::before': {
                transform: 'scaleX(1)',
              },
            }}
          />
          <List
            size="lg"
            component="nav"
            sx={{
              flex: 'none',
              fontSize: 'xl',
              '& > div': { justifyContent: 'center' },
            }}
          >
            {categories.map((category) => (
              <Button
                key={category.id}
                variant="text"
                onClick={() => handleCategoryClick(category.id)}
              >
                <span className="material-symbols-outlined">{category.icon}</span>
                <ListItemButton sx={{ textAlign: 'left' }}>{category.name}</ListItemButton>
              </Button>
            ))}
          </List>
        </Drawer>
      </React.Fragment>
    </>
  );
}
