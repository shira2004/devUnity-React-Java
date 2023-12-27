import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listContents: [],
};

export const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    getContents: (state, action) => {
      
      state.listContents = (action.payload);
    },
    addContent: (state, action) => {
      state.listContents.push(action.payload);
    },
  },
});

export const { getContents, addContent } = contentSlice.actions;
export default contentSlice.reducer;