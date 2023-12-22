
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log(action.payload);
      state.currentUser = action.payload;
    },
    // ... other reducers
  },
});

export const { setUser } = usersSlice.actions;

export default usersSlice.reducer;
