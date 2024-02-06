import React from 'react';
import { Card, CardContent, Typography } from "@mui/material";
import Rating from '@mui/material/Rating';

const CommentCard = ({ comment, handleLikeClick }) => {
  return (
    <Card key={comment.id} sx={{ maxWidth: 250, mb: 3 }}>
      <CardContent>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          <img src="/icons8-help-50.png" alt="Add Project" onClick={() => handleLikeClick(comment)} />
          {comment.user.firstName} {comment.user.lastName} has contributed to {comment.user.donationTax}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          <Rating name="read-only" size='small' value={parseInt(comment.score)} readOnly />
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CommentCard;
