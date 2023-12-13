import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

const UrlStep = ({ onFinish }) => {
  const [projectUrl, setProjectUrl] = useState('');

  return (
    <Grid item xs={12}>
      <TextField
        fullWidth
        type="url"
        label="Project URL"
        name="projectUrl"
        id="projectUrl"
        value={projectUrl}
        onChange={(e) => setProjectUrl(e.target.value)}
      />
    </Grid>
  );
};

export default UrlStep;
