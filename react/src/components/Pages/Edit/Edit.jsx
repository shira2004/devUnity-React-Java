import React, { useState } from "react";
import axios from 'axios';
import { Box } from "@mui/material";
import Header from '../../Header/Header'
import ScrollToTopOnMount from "../../Useful/ScrollToTopOnMount";
import { useLocation } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useDispatch, useSelector } from 'react-redux';
import SuccessModal from '../SuccessModal';
import { useNavigate } from 'react-router-dom';
import TaskList from "./TaskList";
import CommentCard from "./CommentCardList";
import ProjectInfoComponent from "./ProjectInfoComponent";
import TaskManagement from "./TaskManagement";

const Edit = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [successModalContent, setSuccessModalContent] = useState({
    text1: "",
    imageSrc: "",
    text2: "",
    button: {},
  });

  const project = location.state.project;
  const nav = useNavigate();
  const comment = useSelector((state) => state.comment.listComments);
  const filteredComments = comment.filter((comment) => comment.project.id === project.id);
  const len = filteredComments.length;

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

  const [TaskFieldVisible, setTaskFieldVisible] = useState(false);

  const handleLikeClick = (comment) => {
    const userId = comment.user.id;
    axios
      .put(`http://localhost:8585/api/users/incrementDonationTax/${userId}`)
      .then((response) => {
        console.log('DonationTax incremented successfully');
        setSuccessModalContent({
          text1: "Hooray! You've just marked User as incredibly helpful!",
          imageSrc: "/megaphone.gif",
          text2:
            "🌍 Your recognition is invaluable! Thanks for being a shining star and fostering a positive environment. 🚀" +
            "🤝  Your acknowledgment is a fantastic boost! 🌟",
          button: successButton,
        });
        console.log(successModalContent)
        setShowSuccessModal(true);
        console.log(response.data);

      })
      .catch((error) => {
        console.error('Error incrementing donationTax', error);

      });
  };

  const handleAddTaskClick = () => {
    setTaskFieldVisible(true);

  };
  const handleMarkAsDone = () => {
    console.log('clicked mark as done');
    const confirmationText =
      "Are you sure you want to mark the project as finished? " +
      "This action is irreversible, but we're here to celebrate your success! 🎉";

    setSuccessModalContent({
      text1: "Confirmation",
      imageSrc: "/question-marks.gif",
      text2: confirmationText,
      button: {
        label: 'Yes, I\'m sure!',
        onClick: () => handleMarkAsDoneConfirmed(),
      },
    });

    setShowSuccessModal(true);

  }

  const handleMarkAsDoneConfirmed = () => {
    console.log('in markAsDone before dispaching ');
    dispatch({
      type: 'MARK_PROJECT_AS_DONE',
      payload: {
        id: project.id,
      },
    })
    setSuccessModalContent({
      text1: "Congratulations! 🎉",
      imageSrc: "/done.gif",
      text2:
        "Awesome job! You've successfully marked your project as done. 🚀" +
        " Your hard work and dedication are truly commendable! 😊",
      button: successButton,
    });
    console.log(successModalContent)
    setShowSuccessModal(true);

  }
  const handleTaskSubmit = (task) => {
    console.log('handleTaskSubmit');
    setTaskFieldVisible(false);
    const indexOfColon = task.indexOf(':');
    let title, content;

    if (indexOfColon !== -1) {
      title = task.substring(0, indexOfColon).trim();
      content = task.substring(indexOfColon + 1).trim();
    } else {
      title = task.trim();
      content = '';
    }

    const newNumRow = isNaN(maxNumRow) ? 1 : maxNumRow + 1;

    dispatch({
      type: 'POST_CONTENTS',
      payload: {
        title: title,
        text: content,
        numRow: newNumRow,
        project: { id: project.id },
      },
    });
  };

  const handleImageClick = (taskId) => {
    const confirmationText =
      "Are you sure you want to delete this task ? " +
      "This action is irreversible, but we're here to celebrate your success! 🎉";

    setSuccessModalContent({
      text1: "Confirmation",
      imageSrc: "/question-marks.gif",
      text2: confirmationText,
      button: {
        label: 'Yes, I\'m sure!',
        onClick: () => handleConfirmImageClick(taskId),
      },
    });

    setShowSuccessModal(true);
  }
  const handleConfirmImageClick = (taskId) => {
    dispatch({
      type: 'DELETE_CONTENT',
      payload: taskId,
    });
    setShowSuccessModal(false);
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
            <ProjectInfoComponent project={project} len={len} />

            <TaskList
              filteredContent={filteredContent}
              handleImageClick={handleImageClick}
            />

            
            <TaskManagement 
            TaskFieldVisible={TaskFieldVisible} 
            handleAddTaskClick={handleAddTaskClick} 
            handleMarkAsDone={handleMarkAsDone} 
            handleTaskSubmit={handleTaskSubmit}
            />

            <p>mark your friend as helpful</p>
            <br />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
              {filteredComments.map((comment) => (
                <CommentCard key={comment.id} comment={comment} handleLikeClick={handleLikeClick} />
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>
      <SuccessModal
        open={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        text1={successModalContent.text1}
        imageSrc={successModalContent.imageSrc}
        text2={successModalContent.text2}
        button={successModalContent.button}
      />

    </>
  );
};

export default Edit;
