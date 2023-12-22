import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const NewChallenge = ({ onDone, inputData }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <div>
          <Typography variant="h7" align="left">
            New Challenge Summary
          </Typography>
          <Typography variant="body1" align="left">
            Category: {inputData.category}
          </Typography>
          <Typography variant="body1" align="left">
            URL: <br /> {inputData.url}
          </Typography>
          <Typography variant="body1" align="left">
            Title:<br /> {inputData.title}
          </Typography>
          <Typography variant="body1" align="left">
            Description:<br /> {inputData.description}
          </Typography>
          <Typography variant="body1" align="left">
            Information:
            <ul>
              {Array.isArray(inputData.information) &&
                inputData.information.map((info, index) => (
                  <li key={index}>{`Information ${index + 1}: ${info}`}</li>
                ))}
            </ul>
          </Typography>
          {inputData.image && (
            <div>
              <Typography variant="body1" align="left">
                Image:
              </Typography>
              <img src={inputData.image} alt="Uploaded" style={{ maxWidth: '100%', marginTop: '10px' }} />
            </div>
          )}
        </div>
      </Grid>
    </Grid>
  );
};

export default NewChallenge;
