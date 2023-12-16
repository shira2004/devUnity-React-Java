import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';

const CategorySelectionStep = ({ onSubmit, onInputChange }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryError, setCategoryError] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8585/api/categories/getCategoris')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  // const handleNext = () => {
  //   // Validate the selected category
  //   if (!selectedCategory) {
  //     setCategoryError(true);
  //     console.error('Please choose a category');
  //     return;
  //   }

  //   setCategoryError(false);
  //   onInputChange('category', selectedCategory);
  //   onSubmit();
  // };

  const handleCategoryChange = (event) => {
    const categoryValue = event.target.value;
    setSelectedCategory(categoryValue);
    setCategoryError(!categoryValue);
    onInputChange('category', categoryValue); // וודא שכאן יש שורה כמו זו
  };
  
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Tooltip title="Add" arrow>
          <TextField
            fullWidth
            select
            label="Category"
            name="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            error={categoryError}
            helperText={categoryError ? 'Please choose a category' : ''}
            sx={{ marginBottom: 2, width: '100%', maxWidth: '100%' }}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
        </Tooltip>
      </Grid>
    </Grid>
  );
};

export default CategorySelectionStep;
