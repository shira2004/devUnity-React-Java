import React from "react";
import Typography from '@mui/material/Typography';

export const CarouselItem = ({ item, width }) => {
  return (
    <div className="carousel-item" style={{ width: width }}>
      <div></div>
      <img className="carousel-img" src={item.icon} />
      <Typography
  className="carousel-item-text"
  variant="body1"
  paragraph
  sx={{ whiteSpace: 'pre-line',fontFamily:'Poppins' }}
>
  {item.description}
</Typography>

    </div>
  );
};
