import React from 'react';
import Header from '../Header/Header';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import img1 from '../../assets/app_code.jpg';
import img2 from '../../assets/app_phone.webp';
import img3 from '../../assets/page.jpeg';


const data = [
  {
    id:1,
    title: 'Enhancing Accessibility in React Components',
    content: 'The goal of this project is to enhance the accessibility features of common React components used in web development. I have identified several areas where improvements can be made, such as ensuring proper ARIA roles, keyboard navigation, and screen reader compatibility.',
    image: img1,
  },
  {
    title: 'Real-Time Chat Application with React and Socket.io',
    content: "I'm excited to share my real-time chat application built with React and Socket.io. The core functionality is complete, and now I'm seeking assistance in refining the UI/UX. If you have a passion for frontend development and CSS styling, your expertise is exactly what I need to make this chat app visually appealing.",
    image: img2,
  },

{title: 'Responsive Landing Page for a React Website',
  content: "Hey DevUnity designers and developers! I've built a React website, and now I'm seeking help in creating a responsive landing page. If you have a knack for frontend development, CSS, and responsive design, your skills can help make the first impression memorable.",
  image: img3,
},

{title: 'izard 2',
  content: 'Lizards are a widespread group of squamate reptiles...',
  image: '/static/images/cards/contemplative-reptile.jpg',
},

{title: 'Lzard 2',
  content: 'Lizards are a widespread group of reptiles...',
  image: '/static/images/cards/contemplative-reptile.jpg',
},
{title: 'Lizar 2',
  content: 'Lizards are a widespread group of squamate reptiles...',
  image: '/static/images/cards/contemplative-reptile.jpg',
},
{title: 'Lizard ',
  content: 'Lizards are a widespread group of squamate reptiles...',
  image: '/static/images/cards/contemplative-reptile.jpg',
},
{title: 'Lizard 2',
  content: 'Lizards are a widespread group of squamate reptiles...',
  image: '/static/images/cards/contemplative-reptile.jpg',
},
{title: 'Lizard 2',
  content: 'Lizards are a widespread group of squamate reptiles...',
  image: '/static/images/cards/contemplative-reptile.jpg',
},
];

const Cards = ({ objects }) => {
  return (
    <>
    <Header/>
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
      {objects.map((object, index) => (
        <Card key={object.title} sx={{ maxWidth: 345, margin: 2 }}>
          <CardMedia sx={{ height: 300 }} image={object.image} title={object.title} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {object.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {object.content}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Learn More</Button>
            <span class="material-symbols-outlined">
            visibility
            </span>
          </CardActions>
        </Card>
      ))}
    </Box>
    </>
  );
};

const App = () => {
  return <Cards objects={data} />;
};

export default App;
