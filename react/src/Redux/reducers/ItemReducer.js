import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  card: []
};

export const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.card.push(action.payload);
    },
    getCategories: (state, action) => {
      state.categories = action.payload;
    }
  }
});

export const { addItem, getCategories } = itemSlice.actions;
export default itemSlice.reducer;
