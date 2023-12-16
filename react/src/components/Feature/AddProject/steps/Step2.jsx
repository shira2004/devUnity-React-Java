import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

const maxCharacters = 240;

const AddContentStep = ({ onSubmit, onInputChange }) => {
  // State variables for form fields and errors
  const [title, setTitle] = useState('');
  const [information, setInformation] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [informationError, setInformationError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [urlError, setUrlError] = useState(false);
  const [image, setImage] = useState(null);

  // Constants for minimum input lengths
  const minTitleLength = 50;
  const minDescriptionLength = 50;
  const minInformationLength = 50;

  // Event handler for title change
  const handleTitleChange = (event) => {
    const titleValue = event.target.value;
    setTitle(titleValue);
    setTitleError(!titleValue || titleValue.length < minTitleLength);
    onInputChange('title', titleValue);
  };

  // Event handler for description change
  const handleDescriptionChange = (event) => {
    const enteredText = event.target.value;
    const truncatedText = enteredText.slice(0, maxCharacters);
    setDescription(truncatedText);
    setDescriptionError(!enteredText || enteredText.length < minDescriptionLength);
    onInputChange('description', truncatedText);
  };

  // Event handler for information change
  const handleInformationChange = (event) => {
    const enteredText = event.target.value;
    setInformation(enteredText);
    setInformationError(!enteredText || enteredText.length < minInformationLength);
    onInputChange('information', enteredText);
  };

  // Event handler for URL change
  const handleUrlChange = (event) => {
    const enteredUrl = event.target.value;
    setUrl(enteredUrl);
    setUrlError(!isValidUrl(enteredUrl));
    onInputChange('url', enteredUrl);
  };

  // Validation function for URL
  const isValidUrl = (url) => {
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    return urlRegex.test(url);
  };

  // Event handler for image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setImage(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  // Event handler for form submission
  const handleSubmit = () => {
    if (!title || !description || !information || !isValidUrl(url)) {
      setTitleError(!title || title.length < minTitleLength);
      setDescriptionError(!description || description.length < minDescriptionLength);
      setInformationError(!information || information.length < minInformationLength);
      setUrlError(!isValidUrl(url));
      console.error('Please enter valid input for all fields');
      return;
    }

    onSubmit();
    console.log('Submitting data:', { title, description, information, url, image });
  };

  // JSX for rendering the component
  return (
    <Grid container spacing={2}>
      {/* Title Input */}
      <Grid item xs={12} sm={6}>
        <Tooltip
          title={`Please provide a clear and concise title for your project. Minimum ${minTitleLength} characters required.`}
          arrow
        >
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={title}
            onChange={handleTitleChange}
            error={titleError}
            helperText={titleError ? `Please enter a title with at least ${minTitleLength} characters` : ''}
            sx={{ marginBottom: 2, width: '100%', maxWidth: '100%' }}
          />
        </Tooltip>
      </Grid>

      {/* URL Input */}
      <Grid item xs={12} sm={6}>
        <Tooltip
          title="Provide a link to your public GitHub repository for the project."
          arrow
        >
          <TextField
            fullWidth
            label="URL"
            name="url"
            onChange={handleUrlChange}
            value={url}
            error={urlError}
            helperText={urlError ? 'Please enter a valid URL' : ''}
            sx={{ marginBottom: 2, width: '100%', maxWidth: '100%' }}
          />
        </Tooltip>
      </Grid>

      {/* Description Input */}
      <Grid item xs={12}>
        <Tooltip title="Briefly describe your project, its purpose, and the impact you hope to make.">
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            name="description"
            onChange={handleDescriptionChange}
            value={description}
            error={descriptionError}
            helperText={descriptionError ? `Please enter a description with at least ${minDescriptionLength} characters` : ''}
            sx={{ width: '100%', maxWidth: '100%' }}
          />
        </Tooltip>
        <Typography variant="body2" color="textSecondary" sx={{ marginTop: 1 }}>
          {`${description.length}/${maxCharacters} characters`}
        </Typography>
      </Grid>


      {/* Information Input */}
      <Grid item xs={12}>
        <Tooltip
          title={`Clearly list ways in which contributors can help. Minimum ${minInformationLength} characters required.`}
          arrow
        >
          <TextField
            fullWidth
            multiline
            rows={6}
            label="Information"
            name="information"
            onChange={handleInformationChange}
            value={information}
            error={informationError}
            helperText={informationError ? `Please enter information with at least ${minInformationLength} characters` : ''}
            style={{ marginTop: '20px', border: informationError ? '2px solid red' : '1px solid #ced4da' }}
          />
        </Tooltip>
      </Grid>

      {/* Image Upload */}
      <Grid item xs={12}>
        <label htmlFor="image-upload">
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
          <Button
            variant="outlined"
            component="span"
            startIcon={<AddPhotoAlternateIcon />}
          >
            Upload Image
          </Button>
        </label>
      </Grid>

      {/* Display Uploaded Image */}
      {image && (
        <Grid item xs={12}>
          <img src={image} alt="Uploaded" style={{ maxWidth: '100%', marginTop: '10px' }} />
        </Grid>
      )}

    
    </Grid>
  );
};

export default AddContentStep;
