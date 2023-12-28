import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listComments: [],
};

export const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    getComments: (state, action) => {
      
      state.listComments = (action.payload);
    },
    
    addComment: (state, action) => {
      state.listComments.push(action.payload);
    },
  },
});

export const { getComments, addComment } = commentSlice.actions;
export default commentSlice.reducer;