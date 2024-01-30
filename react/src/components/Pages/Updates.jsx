import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import Header from '../Header/Header'
import ScrollToTopOnMount from "../Useful/ScrollToTopOnMount";
import { useLocation } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useDispatch, useSelector } from 'react-redux';
import { format } from "date-fns";
import Rating from '@mui/material/Rating';
import axios from "axios";

const Updates = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [showSuccessModal, setShowSuccessModal] = useState(false); 

  const project = location.state.project;
  // const user = useSelector((state) => state.user.currentUser);


  const comment = useSelector((state) => state.comment.listComments);
  const filteredComments = comment.filter((comment) => comment.project.id === project.id);
  const len = filteredComments.length;
  
  const [value, setValue] = useState(1);


  const content = useSelector((state) => state.content.listContents);
  const filteredContent = content.filter((content) => {
    if (content.project && project && project.id) {
      return content.project.id === project.id;
    }
    return false;
  });

const maxNumRow = filteredContent.reduce((max, content) => {
  return Math.max(max, content.numRow || 0);
}, 0);

  const [task , setTask] = useState('');
  const [TaskFieldVisible, setTaskFieldVisible] = useState(false);

  const handleAddTaskClick = () => {
    console.log("hiiii");
    setTaskFieldVisible(true);
   
  };
  const handleMarkAsDone=() =>{
    console.log('in markAsDone');
      dispatch({
        type: 'MARK_PROJECT_AS_DONE',
        payload: {
          id: project.id,
        },
      })
}
    
  const handleTaskSubmit = () => {
    setTaskFieldVisible(false);
    const [title, content] = task.split(':');
    const newNumRow = isNaN(maxNumRow) ? 1 : maxNumRow + 1;
    dispatch({
      type: 'POST_CONTENTS',
      payload: {
        title: title,
        text: content,
        numRow: newNumRow,
        project: {id: project.id},
      },
    });
  };
  const handleImageClick = (taskId) => {
    dispatch({
      type: 'DELETE_CONTENT',
      payload: taskId,
    });
  };
  const handleLikeClick = (comment) => {
    const userId = comment.user.id;
    axios
      .put(`http://localhost:8585/api/users/incrementDonationTax/${userId}`)
      .then((response) => {
        console.log('DonationTax incremented successfully');
        setShowSuccessModal(true);
        console.log(response.data);

      })
      .catch((error) => {
        console.error('Error incrementing donationTax', error);

      });
  };
  const successButton = {
    label: 'go to home page',
    onClick: () => nav('/homepage'),
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
                    <img
                    src="/icons-x.png"
                    alt="x"
                    onClick={() => handleImageClick(item.id)}
                    style={{ cursor: 'pointer' }} 
                     />
                <strong>{item.title}</strong>  {item.text}
              </Typography>
            ))}

            

            {!TaskFieldVisible && (
              <div>
              <Button variant="contained" onClick={handleAddTaskClick} >
                Add Task
              </Button>
              <br /><br />

            <Button variant="contained" onClick={handleMarkAsDone}>
              Mark Your project as  Done
              </Button>
              <br /><br />
              </div>
            )}
            

            {TaskFieldVisible && (
              <Box>
                <TextField
                  id="task"
                  label="Enter your new task"
                  multiline
                  fullWidth
                  variant="outlined"
                  onChange={(e)=>setTask(e.target.value)} 
                />
               
                <Button variant="contained" onClick={handleTaskSubmit}>
                  add task
                </Button>
              </Box>
            )}
          <p>mark your friend as helpful</p>
          <br />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
        {filteredComments.map((comment) => (
        <Card key={comment.id} sx={{ maxWidth: 250,  mb: 3 }}>
          <CardContent>
        

            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              <img src="/icons8-help-50.png" alt="Add Project" onClick={() => handleLikeClick(comment)}/>
              {comment.user.firstName} {comment.user.lastName} has contributed to {comment.user.donationTax}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              
              <Rating name="read-only" size='small' value={parseInt(comment.score)} readOnly />
            </Typography>

          </CardContent>
        </Card>
      ))}
      </Box>
          </CardContent>
        </Card>
      </Box>
    
    </>
  );
};

export default Updates;
