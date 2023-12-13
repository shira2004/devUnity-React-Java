// CategorySelectionStep.jsx
import React from 'react';
import Box from '@mui/material/Box';
import images from '../image/images'
import './img.css';

const CategorySelectionStep = ({ onNext }) => {
  return (
    <div>
    
      <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
      <ul id="new-challenge-images">
          {images.map((image) => (
            <li
              key={image.alt}
            
            >
              <img {...image} />
            </li>
          ))}
        </ul>
      </Box>
    </div>
  );
};

export default CategorySelectionStep;
