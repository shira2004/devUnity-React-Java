import { Box, CardMedia, Container, Stack, Typography } from "@mui/material";
import React from "react";
import detailsImage from '/feeling_proud.png';
import postImage from '/feeling_proud.png';
import Rightbar from './rightbar';
import CommentList from '../../Useful/CommentList'
import ScrollToTopOnMount from '../../Useful/ScrollToTopOnMount';
const Details = () => {
  return (
    <>
    <ScrollToTopOnMount/>
    <Box>
      <Box
        sx={{
          backgroundImage: `url(${detailsImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "250px",
        }}
      >
        <Typography
          align="center"
          color={"black"}
          //variant="h2"
          //sx={{ fontWeight: 900, padding: 10 }}
        >
          Clicked Poste Title
        </Typography>
      </Box>
      <Container>
        <hr />
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 1, sm: 2, md: 8 }}
          mt={8}
        >
          <Box flex={3} sx={{ padding: "18px 100px 100px 100px" }}>
            <Typography
              m={4}
              align="center"
              //color={"gray"}
              //variant="body1"
              //sx={{ fontWeight: 900 }}
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut
              laudantium voluptates quaerat, excepturi soluta quos repudiandae
              consequuntur? Magnam labore blanditiis enim, laborum atque nulla
              veniam impedit necessitatibus totam, sed quibusdam?
            </Typography>
            <CardMedia
              component="img"
              height="300px"
              image={postImage}
              alt="green iguana"
            />
            <Typography align="center" variant="h8" mt={2}>
              lets start
            </Typography>
            <Typography
              m={4}
              color={"gray"}
              variant="body1"
              //sx={{ fontWeight: 900 }}
            >
              hank you for considering a contribution! Follow these simple steps:<br/>

1.Fork & Clone: Fork the repository, clone it to your local machine.<br/>

2.Create a Branch: Make a new branch for your contribution.<br/>

3.Make Changes: Implement your changes, adhering to coding standards.<br/>

4.Commit & Push: Commit changes, push to your forked repo.<br/>

5.Submit Pull Request: Open a pull request, explaining your changes.<br/>

That's it! Your contribution will be reviewed and merged.<br/>

Happy coding!
            </Typography>
          </Box>
          <Box flex={1}>
          
          </Box>
        </Stack>
      </Container>
    </Box>
    <CommentList />
    </>
  );
};

export default Details;