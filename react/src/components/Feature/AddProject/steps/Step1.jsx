import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const CategorySelectionStep = ({ onNext, onInputChange }) => {
  const [category, setCategory] = useState('');
  const [categoryError, setCategoryError] = useState(false);

  const handleCategoryChange = (event) => {
    const categoryValue = event.target.value;
    onInputChange('category', categoryValue);
    setCategory(categoryValue);
    setCategoryError(!categoryValue);
  };

  return (
    <TextField
      fullWidth
      label="Category"
      name="category"
      error={categoryError}
      helperText={categoryError ? 'Please choose a category' : ''}
      onChange={handleCategoryChange}
      style={{ border: categoryError ? '2px solid red' : '1px solid #ced4da' }}
      value={category}
      select
      SelectProps={{
        native: false, // Set to false to use a custom dropdown button
        renderValue: (value) => value, // Render the selected value in the input
      }}
    >
      <MenuItem value="">Select a category</MenuItem>
      <MenuItem value="category1">Category 1</MenuItem>
      <MenuItem value="category2">Category 2</MenuItem>
      {/* Add more MenuItem elements for each category option */}
    </TextField>
  );
};

export default CategorySelectionStep;
