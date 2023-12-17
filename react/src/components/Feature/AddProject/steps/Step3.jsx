import React, { useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Grid from '@mui/material/Grid';

export default function () {
  return (
    <>
      <Grid item xs={12}>
        <FormControlLabel
          control={<Checkbox value="" color="primary" />}
          label="I confirm that I have read and understood the contribution guidelines."
        />
      </Grid>
      <br/><br/>

    </>
  )
}
