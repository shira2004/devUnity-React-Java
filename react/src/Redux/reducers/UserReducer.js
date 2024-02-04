import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  userAdded: 0,
};

export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log('in state');
      state.currentUser = action.payload;
      
    },
    addUserSuccess: (state, action) => {
      state.userAdded = 1;
    },
    addUserFailure: (state) => {
      console.log('in addUserFailure');
      state.userAdded = 2;
    },

    addUserFailure2: (state) => {
      console.log('in addUserFailure');
      state.userAdded = 3;
    },
  },
});

export const { setUser, addUserSuccess, addUserFailure ,addUserFailure2 } = usersSlice.actions;

export default usersSlice.reducer;
