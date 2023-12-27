
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  userAdded: false,
};

export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log(action.payload);
      state.currentUser = action.payload;
    },
    addUser: (state, action) => {
      state.currentUser = action.payload;
      state.userAdded = true;
    },
  },
});

export const { setUser, addUser } = usersSlice.actions;

export default usersSlice.reducer;