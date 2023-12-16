import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const maxCharacters = 240;

const AddContentStep = ({ onSubmit, onInputChange }) => {
  const [title, setTitle] = useState('');
  const [information, setInformation] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [informationError, setInformationError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [urlError, setUrlError] = useState(false);

  const handleTitleChange = (event) => {
    const titleValue = event.target.value;
    setTitle(titleValue);
    setTitleError(!titleValue);
    onInputChange('title', titleValue);
  };

  const handleDescriptionChange = (event) => {
    const enteredText = event.target.value;
    setDescription(enteredText.slice(0, maxCharacters));
    setDescriptionError(!enteredText);
    onInputChange('description', enteredText);
  };

  const handleInformationChange = (event) => {
    const enteredText = event.target.value;
    setInformation(enteredText);
    setInformationError(!enteredText);
    onInputChange('information', enteredText);
  };

  const handleUrlChange = (event) => {
    const enteredUrl = event.target.value;
    setUrl(enteredUrl);
    setUrlError(!isValidUrl(enteredUrl));
    onInputChange('url', enteredUrl);
  };

  const isValidUrl = (url) => {
    // כאן אתה יכול להשתמש בבדיקת תקינות כתובת ה-URL שלך, לדוג', יכול להיות שתשתמש ברגולר אקספרשן.
    // בדוגמה זו יש בדיקה פשוטה אך לא מלאה.
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    return urlRegex.test(url);
  };

  const handleSubmit = () => {
    if (!title || !description || !information || !isValidUrl(url)) {
      setTitleError(!title);
      setDescriptionError(!description);
      setInformationError(!information);
      setUrlError(!isValidUrl(url));
      console.error('Please enter title, description, information, and a valid URL');
      return;
    }

    onSubmit();
    console.log('Submitting data:', { title, description, information, url });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={title}
          onChange={handleTitleChange}
          error={titleError}
          helperText={titleError ? 'Please enter a title' : ''}
          sx={{ marginBottom: 2, width: '100%', maxWidth: '100%' }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
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
          sx={{ width: '100%', maxWidth: '100%' }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="information"
          name="information"
          onChange={handleInformationChange}
          value={information}
          error={informationError}
          helperText={informationError ? 'Please enter information' : ''}
          style={{ marginTop: '20px', border: informationError ? '2px solid red' : '1px solid #ced4da' }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
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
      </Grid>
      <Grid item xs={12}>
        <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ marginTop: 2 }}>
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddContentStep;
