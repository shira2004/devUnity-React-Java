import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listProjects: [],
};

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    getProjects: (state, action) => {
      
      state.listProjects = (action.payload);
    },
    addProject: (state, action) => {
      state.listProjects.push(action.payload);
    },
  },
});

export const { getProjects, addProject } = projectSlice.actions;
export default projectSlice.reducer;