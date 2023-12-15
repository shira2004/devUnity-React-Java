import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

const PasteUrlStep = ({ onNext, onInputChange }) => {
  const [url, setUrl] = useState('');

  const handleUrlChange = (event) => {
    const urlValue = event.target.value;
    setUrl(urlValue);
    onInputChange('url', urlValue);
  };

  return (
    <Grid item xs={12}>
      <TextField
        fullWidth
        type="url"
        label="Paste URL"
        name="url"
        id="url"
        value={url}
        onChange={handleUrlChange}
      />
    </Grid>
  );
};

export default PasteUrlStep;
