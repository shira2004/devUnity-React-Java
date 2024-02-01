import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import Header from "../../Header/Header";
import CommentList from "../../Useful/CommentList";
import ScrollToTopOnMount from "../../Useful/ScrollToTopOnMount";
import { useLocation } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useDispatch, useSelector } from 'react-redux';
import { format } from "date-fns";
import Rating from '@mui/material/Rating';
import SuccessModal from '../../Pages/SuccessModal'; 
import { useNavigate } from 'react-router-dom';


const Details = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const project = location.state.project;
  const content = useSelector((state) => state.content.listContents);
  const user = useSelector((state) => state.user.currentUser);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const comments = useSelector((state) => state.comment.listComments);
  const filteredComments = comments.filter((comment) => comment.project.id === project.id);
  const len = filteredComments.length;
  
  const [value, setValue] = useState(1);

  const filteredContent = content.filter((content) => {
    if (content.project && project && project.id) {
      return content.project.id === project.id;
    }
    return false;
  });

  const nav = useNavigate();

  const [comment , setComment] = useState('');
  const [isCommentFieldVisible, setCommentFieldVisible] = useState(false);

  const handleAddCommentClick = () => {
    if (user != null) {
      setCommentFieldVisible(true);
    } else {
      setShowSuccessModal(true);
    }
  };

  const handleCommentSubmit = () => {
    setCommentFieldVisible(false);
    dispatch({
      type: 'ADD_COMMENT',
      payload: {
        user: user,
        project: project,
        content: comment,
        score: value
      },
    });
  };

  const successButton = {
    label: 'go to sign in',
    onClick: () => nav('/Signin'),
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
              {format(project.date , 'dd/MM/yy')}
            </Typography>

    
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              {project.user.firstName} {project.user.lastName}
            </Typography>

            <Typography variant="h5" component="div">
              {project.title}
            </Typography>

            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              <Rating name="read-only" size='small' value={project.score === 0 ? 0 : (project.score) / len} readOnly />
            </Typography>

            <Typography variant="body2">
              {project.description}
            </Typography>

            <Typography variant="body2">
            <img src="/github-logo.png" alt="My Account" /><br />
              <strong>{project.url}</strong>
            </Typography>
            

            <br/><br/><br/>
            <Typography variant="body2">
              <img
                src={`data:image/*;base64,${project.image}`}
                alt="Project Image"
                style={{ width: '100%', height: 'auto' }}
              />
            </Typography>

            {filteredContent.map((item) => (
              <Typography key={item.id} variant="body2" sx={{ textAlign: 'left' , mb: '8px'}}>
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

            <CommentList id={project.id} />


            {!isCommentFieldVisible && (
              <Button variant="contained" onClick={handleAddCommentClick}>
                Add Comment
              </Button>
            )}

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
                <Rating
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue === 0 || newValue === null ? 1 : newValue);
                  }}
                />
                <Button variant="contained" onClick={handleCommentSubmit}>
                  Submit Comment
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>

      <SuccessModal
        open={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        text1="Sign In Required"
        imageSrc="/sign-in.gif"
        text2="Please sign in to add a project."
        button={successButton}
      />
    </>
  );
};

export default Details;
