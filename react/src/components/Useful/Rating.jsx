import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

export default function RatingSize() {
  return (
    <Stack spacing={0.5}>
      <Rating name="size-medium" defaultValue={2} />
    </Stack>
  );
}