import React from 'react';
import { Box,Typography } from "@mui/material";

const TaskList = ({ filteredContent, handleImageClick }) => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
      {filteredContent.map((item) => (
        <Typography key={item.id} variant="body2" sx={{ textAlign: 'left', mb: '8px' }}>
          <img
            src="/icons-x.png"
            alt="x"
            onClick={() => handleImageClick(item.id)}
            style={{ cursor: 'pointer' }}
          />
          <strong>{item.title}</strong>  {item.text}
        </Typography>
      ))}
    </Box>
  );
};

export default TaskList;