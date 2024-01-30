import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const maxCharacters = 500;

const AddContentStep = ({ onInputChange }) => {
  const [title, setTitle] = useState('');
  const [information, setInformation] = useState(['']);
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [informationError, setInformationError] = useState([false]);
  const [descriptionError, setDescriptionError] = useState(false);
  const [urlError, setUrlError] = useState(false);
  const [image, setImage] = useState(null);
  const [infoFieldsCount, setInfoFieldsCount] = useState(1);

  const minTitleLength = 5;
  const minDescriptionLength = 50;
  const minInformationLength = 50;

  const handleTitleChange = (event) => {
    const titleValue = event.target.value;
    setTitle(titleValue);
    setTitleError(!titleValue || titleValue.length < minTitleLength);
    onInputChange('title', titleValue);
  };

  

  const handleDescriptionChange = (event) => {
    const enteredText = event.target.value;
    const truncatedText = enteredText.slice(0, maxCharacters);
    setDescription(truncatedText);
    setDescriptionError(!enteredText || enteredText.length < minDescriptionLength);
    onInputChange('description', truncatedText);
  };

  const handleInformationChange = (event, index) => {
    const enteredText = event.target.value;
    setInformation((prevInfo) => {
      const updatedInfo = [...prevInfo];
      updatedInfo[index] = enteredText;
      return updatedInfo;
    });
    setInformationError((prevErrors) => {
      const updatedErrors = [...prevErrors];
      updatedErrors[index] = !enteredText || enteredText.length < minInformationLength;
      return updatedErrors;
    });
    onInputChange('information', [...information]);
  };

  const handleUrlChange = (event) => {
    const enteredUrl = event.target.value;
    setUrl(enteredUrl);
    setUrlError(!isValidUrl(enteredUrl));
    onInputChange('url', enteredUrl);
  };

  const isValidUrl = (url) => {
       const urlRegex =/^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+(\/)?$/;
       return urlRegex.test(url);
     };

     const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImage(file);
      onInputChange('image', file);
      }
    };

  const handleAddTextField = () => {
    setInfoFieldsCount((prevCount) => prevCount + 1);
  };

  return (
    <Grid container spacing={2}>
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

      <Grid item xs={12}>
        <Tooltip title="Briefly describe your project, its purpose, and the impact you hope to make.">
          <TextField
            fullWidth
            multiline
            rows={5}
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

      <Grid item xs={12}>
  <Tooltip
    title={`Clearly list ways in which contributors can help. Minimum ${minInformationLength} characters required.`}
    arrow
  >
    <>
      {[...Array(infoFieldsCount)].map((_, index) => (
        <TextField
          key={index}
          fullWidth
          multiline
          rows={3}
          label={`Information ${index + 1}`}
          name={`information-${index}`}
          onChange={(event) => handleInformationChange(event, index)}
          value={information[index] || ''}
          error={informationError[index]}
          helperText={informationError[index] ? `Please enter information with at least ${minInformationLength} characters` : ''}
          style={{ marginTop: '20px', border: informationError[index] ? '2px solid red' : '1px solid #ced4da' }}
        />
      ))}
      <Button variant="outlined" onClick={handleAddTextField} style={{ marginTop: '10px' }}>
        Add Information Field
      </Button>
    </>
  </Tooltip>
</Grid>
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
            
          >
            <img src="/icons-upload-image.png" alt="Upload Icon"/>
            Upload Image
          </Button>
        </label>
      </Grid>

      {image && (
        <Grid item xs={12}>
          <img
          src={image || '/icons-sign-in-16.png'}
          alt="Uploaded"
          style={{ maxWidth: '100%', marginTop: '10px' }}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default AddContentStep;