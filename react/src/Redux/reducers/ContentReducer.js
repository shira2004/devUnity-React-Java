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

    deleteContent: (state, action) => {
      const deletedContentId = action.payload;
      state.listContents = state.listContents.filter(content => content.id !== deletedContentId);
    },
  },
});

export const { getContents, addContent , deleteContent } = contentSlice.actions;
export default contentSlice.reducer;