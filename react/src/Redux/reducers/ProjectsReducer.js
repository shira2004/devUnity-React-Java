import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listProjects: [],
};

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    getProjectsByCategory: (state, action) => {
      const { categoryId, projects } = action.payload;
      // both categoryId and projects
      state.listProjects = projects;
    },
    addProject: (state, action) => {
      state.listProjects.push(action.payload);
    },
  },
});

export const { getProjectsByCategory, addProject } = projectSlice.actions;
export default projectSlice.reducer;
