import React from 'react';

const NewChallenge = ({ onDone, inputData }) => {
  const handleSubmit = () => {

    console.log('Submitting data:', inputData);
    onDone();
  };

  return (
    <div>
      <h2>New Challenge Summary</h2>
      <p>Category: {inputData.category}</p>
      <p>Title: {inputData.title}</p>
      <p>Description: {inputData.description}</p>
      <p>URL: {inputData.url}</p>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default NewChallenge;
