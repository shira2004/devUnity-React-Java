import React from 'react';
import ButtonBaseDemo from './ButtonBaseDemo';

const CategorySelectionStep = ({ onNext }) => {
  return (
    <div>
      <h2>Step 1: Choose a Category</h2>
      <ButtonBaseDemo />
      <button onClick={onNext}>Next</button>
    </div>
  );
};

export default CategorySelectionStep;