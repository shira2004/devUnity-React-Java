import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Header from '../../../Header/Header';
import CategorySelectionStep from './Step1';
import AddContentStep from './Step2';
import PasteUrlStep from './Step3';
import NewChallenge from './NewChallenge';
import axios from 'axios';
import {  useSelector } from 'react-redux';
const steps = ['Choose Category', 'Add Content', 'Submit'];
import { useNavigate } from 'react-router-dom';

const HorizontalLinearStepper = () => {
  const nav = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  
  const [inputData, setInputData] = useState({
    category: '',
    title: '',
    description: '',
    information: '',
    image: '',
    url: '',
  });
  const userId = useSelector((state) =>state.user.currentUser.id)
console.log(userId);
  const handleNext = () => {
    if (!validateStep()) {
      return;
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const validateStep = () => {
    const { category, title, description, url } = inputData;
  
    if (activeStep === 0 && !category) {
      console.error('Please choose a category');
      return false;
    }
  
    if (activeStep === 1 && (!title || !description)) {
      console.error('Please enter both title and description');
      return false;
    }
  
    if (activeStep === 2) {
      if (!url) {
        console.error('Please paste a URL');
        return false;
      }
  
      if (!isValidGitHubUrl(url)) {
        console.error('Please enter a valid GitHub URL');
        return false;
      }
    }
  
    return true;
  };
  
  


  // const isValidUrl = (url) => {
  //   const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
  //   return urlRegex.test(url);
  // };
  

  const handleInputChange = (fieldName, value) => {
    setInputData((prevInputData) => ({ ...prevInputData, [fieldName]: value }));
  };
  

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return <CategorySelectionStep onNext={handleNext} onInputChange={handleInputChange} />;
      case 1:
        return <AddContentStep onNext={handleNext} onInputChange={handleInputChange} />;
      case 2:
        return (
          <>
            <PasteUrlStep onNext={handleNext} onInputChange={handleInputChange} />
            <NewChallenge onDone={handleSubmit} inputData={inputData} />
          </>
        );
      default:
        return null;
    }
  };

  const handleSubmit=async() => {
    console.log(userId);
    await axios
      .post('http://localhost:8585/api/projects/createProject', {
        title: inputData.title,
        description:inputData.description,
        url: inputData.url,
        user:{id: userId
        },
        category:{id:inputData.category},
      })
      .then((response) => {

        console.log("😊");
        console.log(response.status);
        if (response.status === 201) {
          console.log('project created successfully:', response.data);
          // Redirect to /HomePage after successful submission
          nav('/Success');
        } else {
          console.error('Error creating user:', response.data);
          // Handle error, show user feedback, etc.
        }
      })
      .catch((error) => {
        console.error('An error occurred during the user creation request:', error);
        
      });

  }

  return (
    <>
      <Header />
      <Box sx={{ width: '500px', margin: '0 auto', paddingTop: 10 }}>
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <Box sx={{ padding: 2 }}>
          {renderStepContent()}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {activeStep !== steps.length - 1 && (
              <>
                <Button onClick={handleNext} disabled={activeStep === steps.length - 1} sx={{ mr: 1 }}>
                  Next
                </Button>
              </>
            )}
            {activeStep === steps.length - 1 && (
              <>
              {/* navigate to secces page */}
                <Button onClick={handleSubmit} sx={{ mr: 1 }}>
                  Finish
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default HorizontalLinearStepper;
