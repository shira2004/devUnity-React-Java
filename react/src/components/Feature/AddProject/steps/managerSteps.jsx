import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Header from '../../../Header/Header'
import CategorySelectionStep from './Step1';
import AddContentStep from './Step2';
import PasteUrlStep from './Step3';

const steps = ['choose category', 'add your content', 'paste your url'];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return <CategorySelectionStep onNext={handleNext} />;
      case 1:
        return <AddContentStep onNext={handleNext} />;
      case 2:
        return <PasteUrlStep onNext={handleNext} />;
      default:
        return null;
    }
  };

  return (
    <>
    <Header/>
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
              <Button onClick={handleNext} disabled={activeStep !== steps.length - 1}>
                Finish
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Box>
    </>
  );
}
