import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import postImage2 from "/feeling_proud.png";
import postImage3 from "/feeling_proud.png";
import postImage4 from "/feeling_proud.png";
import Card from "../../Useful/Cards";

const Rightbar = () => {
  const [isCommentFieldOpen, setIsCommentFieldOpen] = useState(false);
  const [comment, setComment] = useState("");

  const handleCommentFieldToggle = () => {
    setIsCommentFieldOpen(!isCommentFieldOpen);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleAddComment = () => {
    // Handle adding the comment (e.g., send it to a server or update state)
    console.log("Added comment:", comment);
    // Clear the comment field and close it
    setComment("");
    setIsCommentFieldOpen(false);
  };

  return (
    <Box>
      <Typography align="center" bgcolor={"black"} color="white">
        Comments
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
      {isCommentFieldOpen ? (
        <Box>
          <TextField
            multiline
            fullWidth
            rows={3}
            placeholder="Write your comment..."
            value={comment}
            onChange={handleCommentChange}
          />
          <Button variant="contained" onClick={handleAddComment}>
            Add Comment
          </Button>
        </Box>
      ) : (
        <Button variant="outlined" onClick={handleCommentFieldToggle}>
          Write a Comment
        </Button>
      )}
      
      <Card cardImage={postImage3} />
    </Box>
  );
};

export default Rightbar;
