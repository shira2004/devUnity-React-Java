import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';


const CategorySelectionStep = ({ onSubmit, onInputChange }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoryError, setCategoryError] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8585/api/categories/getCategoris');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (event) => {
    const categoryValue = event.target.value;
    setSelectedCategory(categoryValue);
    setCategoryError(!categoryValue);
    onInputChange('category', categoryValue);
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
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>

      </Grid>
    </Grid>
  );
};

export default CategorySelectionStep;
