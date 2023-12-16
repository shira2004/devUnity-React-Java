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

const steps = ['choose category', 'add your content', 'paste your url'];

const HorizontalLinearStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [inputData, setInputData] = useState({
    category: '',
    title: '',
    description: '',
    information: '',
    url: '',
  });

  const handleNext = () => {
    let isValid = true;

    switch (activeStep) {
      case 0:
        if (!inputData.category) {
          console.error('Please choose a category');
          isValid = false;
        }
        break;
      case 1:
        // Validate for the second step (AddContentStep)
        if (!inputData.title || !inputData.description) {
          // Display an error message or handle the lack of title/description input
          console.error('Please enter both title and description');
          isValid = false;
        }
        break;
      case 2:
        // Validate for the third step (PasteUrlStep)
        if (!inputData.url) {
          // Display an error message or handle the lack of URL input
          console.error('Please paste a URL');
          isValid = false;
        }
        break;
      default:
        break;
    }

    // Additional check for the selected category
    if (activeStep === 0 && !inputData.category) {
      console.error('Please choose a category');
      isValid = false;
    }

    // If the validation passes, proceed to the next step
    if (isValid) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

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

  const handleSubmit = () => {
    // Perform your server post with inputData
    // You can call your server post function here
    console.log('Submitting data:', inputData);
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
