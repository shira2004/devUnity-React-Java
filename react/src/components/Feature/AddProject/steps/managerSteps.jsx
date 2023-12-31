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
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SuccessModal from '../../../Pages/SuccessModal';
import { useDispatch } from 'react-redux';

const HorizontalLinearStepper = () => {
  // State variables
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [inputData, setInputData] = useState({
    category: '',
    title: '',
    description: '',
    image: '',
    url: '',
  });

  // Redux
  const userId = useSelector((state) => state.user.currentUser.id);
  const dispatch = useDispatch();

  // Steps and form data
  const steps = ['Choose Category', 'Add Content', 'Submit'];
  const formData = new FormData();

  // Navigation
  const nav = useNavigate();

  // Event handlers
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
    // Validation logic here...
    return true;
  };

  const handleInputChange = (fieldName, value) => {
    setInputData((prevInputData) => ({ ...prevInputData, [fieldName]: value }));
  };

  const handleSubmit = () => {
    formData.append('image', inputData.image);

    const objectToSend = {
      title: inputData.title,
      description: inputData.description,
      url: inputData.url,
      user: { id: userId },
      category: { id: inputData.category },
      date: new Date(),
    };

    formData.append("project", new Blob([JSON.stringify(objectToSend)], { type: 'application/json' }));

    dispatch({
      type: 'ADD_PROJECT',
      payload: {
        project: formData,
        content: inputData.information,
    }});

    inputData.information.map((item, index) => {
      const [title, content] = item.split(':');
      const trimmedTitle = title ? title.trim() : item.trim();
      console.log(trimmedTitle);
      console.log(content ? content.trim() : ''); 
    });
 
    setShowSuccessModal(true);
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    nav('/HomePage');
  };

  // Define the successButton object
  const successButton = {
    label: 'Back to Home Page',
    onClick: () => nav('/HomePage'),
  };
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
         
          {activeStep === 0 && (
            <CategorySelectionStep onNext={handleNext} onInputChange={handleInputChange} />
          )}
          {activeStep === 1 && <AddContentStep onNext={handleNext} onInputChange={handleInputChange} />}
          {activeStep === 2 && (
            <>
              <PasteUrlStep onNext={handleNext} onInputChange={handleInputChange} />
              <NewChallenge onDone={handleSubmit} inputData={inputData} />
            </>
          )}

          {/* Navigation buttons */}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {activeStep !== steps.length - 1 && (
              <Button onClick={handleNext} disabled={activeStep === steps.length - 1} sx={{ mr: 1 }}>
                Next
              </Button>
            )}
            {activeStep === steps.length - 1 && (
              <Button onClick={handleSubmit} sx={{ mr: 1 }}>
                Finish
              </Button>
            )}
          </Box>
        </Box>

        {/* Success modal */}
        <SuccessModal
          open={showSuccessModal}
          onClose={handleSuccessModalClose}
          text1="Fantastic job! 🌟 Your project has been successfully added to DevUnity"
          imageSrc="/success.gif"
          text2="Share your creation with the community, gather feedback, and inspire others with your innovation. Keep up the great work, and let the collaboration begin! 🚀."
          button={successButton}
        />
      </Box>
    </>
  );
};

export default HorizontalLinearStepper;