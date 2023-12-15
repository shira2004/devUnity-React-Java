import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

const maxCharacters = 240;

const AddContentStep = ({ onNext, onInputChange }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  const handleTitleChange = (event) => {
    const titleValue = event.target.value;
    setTitle(titleValue);
    onInputChange('title', titleValue);
    setTitleError(!titleValue); // Set titleError to true if titleValue is falsy
  };

  const handleDescriptionChange = (event) => {
    const enteredText = event.target.value;
    setDescription(enteredText.slice(0, maxCharacters));
    onInputChange('description', enteredText);
    setDescriptionError(!enteredText); // Set descriptionError to true if enteredText is falsy
  };

  return (
    <>
      <TextField
        fullWidth
        label="Title"
        name="title"
        value={title}
        onChange={handleTitleChange}
        error={titleError}
        helperText={titleError ? 'Please enter a title' : ''}
        style={{ border: titleError ? '2px solid red' : '1px solid #ced4da' }}
      />

      <TextField
        fullWidth
        multiline
        rows={4}
        label="Description"
        name="description"
        onChange={handleDescriptionChange}
        value={description}
        error={descriptionError}
        helperText={descriptionError ? 'Please enter a description' : ''}
        style={{ border: descriptionError ? '2px solid red' : '1px solid #ced4da' }}
      />
    </>
  );
};

export default AddContentStep;
