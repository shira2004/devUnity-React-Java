import {
    Avatar,
    Box,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
  } from "@mui/material";
  import postImage2 from '/feeling_proud.png';
  import postImage3 from '/feeling_proud.png'
  import postImage4 from '/feeling_proud.png'
  import React from "react";
  import Card from "../../Useful/Cards";
  
  const Rightbar = () => {
    return (
      <Box>
        <Typography align="center" bgcolor={"black"} color="white">
          Most Popular
        </Typography>
        <List
          sx={{
            width: "100%",
            height: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
          }}
        >
          <ListItem alignItems="flex-end">
            <ListItemAvatar>
              <Avatar
                sx={{ height: 80, width: 80 }}
                variant="square"
                alt="Remy Sharp"
                src={postImage4}
              />
            </ListItemAvatar>
            <ListItemText
              secondary={" — I'll be in your neighborhood doing errands this…"}
            />
          </ListItem>
          <ListItem alignItems="flex-end">
            <ListItemAvatar>
              <Avatar
                sx={{ height: 80, width: 80 }}
                variant="square"
                alt="Remy Sharp"
                src={postImage3}
              />
            </ListItemAvatar>
            <ListItemText
              secondary={" — I'll be in your neighborhood doing errands this…"}
            />
          </ListItem>
          <ListItem alignItems="flex-end">
            <ListItemAvatar>
              <Avatar
                sx={{ height: 80, width: 80 }}
                variant="square"
                alt="Remy Sharp"
                src={postImage2}
              />
            </ListItemAvatar>
            <ListItemText
              secondary={" — I'll be in your neighborhood doing errands this…"}
            />
          </ListItem>
          <Divider variant="inset" component={"li"} />
        </List>
        <Typography align="center" bgcolor={"black"} color="white">
          About Us
        </Typography>
        <Card cardImage={postImage3} />
      </Box>
    );
  };
  
  export default Rightbar;