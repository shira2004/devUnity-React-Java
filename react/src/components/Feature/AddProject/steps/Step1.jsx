import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const CategorySelectionStep = ({ onSubmit, onInputChange }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryError, setCategoryError] = useState(false);

  useEffect(() => {
    // Fetch categories from the server or any data source
    // For example, you can use the Fetch API or a library like Axios
    // Replace the URL with your actual endpoint
    fetch('https://your-server-api/categories')
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  const handleNext = () => {
    // Validate the selected category
    if (!selectedCategory) {
      setCategoryError(true);
      return;
    }

    setCategoryError(false);
    onInputChange('category', selectedCategory);
    onSubmit();
  };

  const handleCategoryChange = (event) => {
    const categoryValue = event.target.value;
    setSelectedCategory(categoryValue);
    setCategoryError(!categoryValue);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
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
      </Grid>
      <Grid item xs={12}>
        <Button onClick={handleNext} variant="contained" color="primary" sx={{ marginTop: 2 }}>
          Next
        </Button>
      </Grid>
    </Grid>
  );
};

export default CategorySelectionStep;
