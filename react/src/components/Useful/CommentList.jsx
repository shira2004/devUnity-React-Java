import React , {useState , useEffect} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Header from '../Header/Header';

import axios from 'axios';

export default function CommentList() {

  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch comments using Axios (replace 'your-api-endpoint' with your actual API endpoint)
    axios
    .get('http://localhost:8585/api/comment/getComments')
      .then((response) => setComments(response.data))
      .catch((error) => console.error('Error fetching comments:', error));
  }, []); // The empty dependency array ensures that this effect runs once after the component mounts

  return (
    <div>
      <Header/>
    {comments.map((comment) => (
      <Card key={comment.id} sx={{ minWidth: 600}}>
        <CardContent>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
          <img src="/icons-avatar-16.png" alt="Add Project" />
            {comment.content}
          </Typography>
        </CardContent>
      </Card>
    ))}
  </div>
  );
}