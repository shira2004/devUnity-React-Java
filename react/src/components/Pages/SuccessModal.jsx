import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const SuccessModal = ({ open, onClose, text1, text2, imageSrc, button })=> {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          {text1}
          {imageSrc && <img src={imageSrc} alt="successfully added" />}
        </Typography>
        <Typography sx={{ mt: 2 }}>
         {text2}
        </Typography>
        <Button onClick={onClose}>Close</Button>
        <Button onClick={button.onClick}>
          {button.label}
        </Button>
      </Box>
    </Modal>
  );
};

export default SuccessModal;
