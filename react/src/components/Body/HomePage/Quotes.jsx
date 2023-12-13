import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Fade from 'react-reveal/Fade';

const Quotes = () => {
    return (
        <Grid container className="quotes" justifyContent="center" alignItems="center">
            <Grid item xs={12} md={8}>
                <Fade left>
                    <Typography variant="h4" align="center" fontWeight="bold" fontFamily="'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif" color="#617d98" sx={{ fontSize: { xs: '3vw', md: '2vw' } }}>
                        "Open Source, Open Minds – DevUnity, your space to contribute, learn, and make a difference in the world of coding."
                    </Typography>
                </Fade>
            </Grid>
        </Grid>
    );
}

export default Quotes;
