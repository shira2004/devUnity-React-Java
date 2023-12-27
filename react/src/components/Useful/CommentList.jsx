import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'; // Import Box
import { useSelector } from 'react-redux';

export default function CommentList(props) {
  const comments = useSelector((state) => state.comment.listComments);
  const filteredComments = comments.filter((comment) => comment.project.id === props.id);
  
  return (
    <Box
  display="flex"
  flexDirection="column"
  alignItems="center"
  
  ml={1} 
>
      {/* <Header/> */}
      <img src="/feedback.png" alt="My Account" />
      {filteredComments.map((comment) => (
        <Card key={comment.id} sx={{ maxWidth: 600, width: '100%', mb: 3 }}>
          <CardContent>
            
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {comment.date}
            </Typography>

            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              <img src="/icons-avatar-16.png" alt="Add Project" />
              {comment.user.firstName} {comment.user.lastName}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {comment.content}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}