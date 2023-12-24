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
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SuccessModal from '../../../Pages/SuccessModal'; 

const steps = ['Choose Category', 'Add Content', 'Submit'];

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
  const userId = useSelector((state) => state.user.currentUser.id);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State for success modal

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

  const handleSubmit = async () => {
    await axios
      .post('http://localhost:8585/api/projects/createProject', {
        title: inputData.title,
        description: inputData.description,
        url: inputData.url,
        user: { id: userId },
        category: { id: inputData.category },
      })
      .then((response) => {
        if (response.status === 201) {
          setShowSuccessModal(true);
        } else {
          console.error('Error creating project:', response.data);
        }
      })
      .catch((error) => {
        console.error('An error occurred during the project creation request:', error);
      });
  };

  const handleSuccessModalClose = () => {
    // Close success modal
    setShowSuccessModal(false);
    // Redirect to /HomePage after closing modal
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
          {/* Step content and form components */}
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
