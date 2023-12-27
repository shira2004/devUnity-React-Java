import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import Header from "../../Header/Header";
import CommentList from "../../Useful/CommentList";
import ScrollToTopOnMount from "../../Useful/ScrollToTopOnMount";
import { useLocation } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useDispatch, useSelector } from 'react-redux';

const Details = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const project = location.state.project;
  const content = useSelector((state) => state.content.listContents);
  const user = useSelector((state) => state.user.currentUser);

  const filteredContent = content.filter((content) => content.project.id === project.id);
  console.log(filteredContent);
 
  const [comment , setComment] = useState('');
  const [isCommentFieldVisible, setCommentFieldVisible] = useState(false);
  const handleAddCommentClick = () => {
    setCommentFieldVisible(true);
  };

  const handleCommentSubmit = () => {
   
    setCommentFieldVisible(false);
    dispatch({
              type: 'POST_COMMENTS' ,
              payload: {
                project: project,
                content: comment,
                user :user,
              }, })
          };

 
  return (
    <>
      <Header />
      <ScrollToTopOnMount />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Card sx={{ maxWidth: 600 }}>
          <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {project.date}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {project.user.firstName} {project.user.lastName}
            </Typography>

            <Typography variant="h5" component="div">
              {project.title}
            </Typography>

            <Typography variant="body2">
              {project.description}
            </Typography>

            <Typography variant="body2">
              {project.content}
            </Typography>
            <br/><br/><br/>

            {filteredContent.map((item) => (
            <Typography key={item.id} variant="body2" sx={{ textAlign: 'left' }}>
               <strong>{item.title}</strong>  {item.text}
            </Typography>
            
          ))}

          <Typography variant="body2"   sx={{ textAlign: 'left' }}>
          <strong>### Thanks for Your Interest! 🌟</strong><br/>

Hey contributors! Your interest in this project is awesome. If you have any questions, need clarification, or want to provide feedback, feel free to drop a comment! Your insights are highly valued.
<br/>
<strong>### Get Started:</strong><br/>
<br/>
<strong>1. **Explore the Code:**</strong><br/>
   - Visit the GitHub repository to check out the codebase.<br/>
   <br/>
   <strong>2. **Pick Your Task:**</strong><br/>
   - Choose a task that matches your skills and interests.<br/>
   <br/>
   <strong>3. **Make Changes:**</strong><br/>
   - Fork the repository, make your changes, and commit.<br/>
   <br/>
   <strong>4. **Test Your Work:**</strong><br/>
   - Ensure everything works as expected.<br/>
   <br/>
   <strong>5. **Submit Your Impact:**</strong><br/>
   - Open a pull request and be part of the project's success!<br/>
   <br/>
<strong>Remember, for any questions or feedback, the comment section is your friend. Let's make this project shine together! 💫</strong><br/>
           </Typography>
<br/><br/><br/>
          
          </CardContent>
          <CommentList id={project.id} />


          
         

          {/* Option to add a new comment */}
          {!isCommentFieldVisible && (
            <Button variant="contained" onClick={handleAddCommentClick}>
              Add Comment
            </Button>
          )}

          <CommentList />
          {isCommentFieldVisible && (
            <Box>
              <TextField
                id="comment"
                label="Enter your comment"
                multiline
                fullWidth
                variant="outlined"
                onChange={(e)=>setComment(e.target.value)}
                
              />
              <Button variant="contained" onClick={handleCommentSubmit}>
                Submit Comment
              </Button>
            </Box>
          )}
        </Card>
      </Box>

      
    </>
  );
};

export default Details;
