import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listProjects: [],
};

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    getProjects: (state, action) => {
      state.listProjects = action.payload;
    },
    addProject: (state, action) => {
      state.listProjects.push(action.payload);
    },
   
    incrementViewerCount: (state, action) => {
      const { projectId } = action.payload;
      const projectIndex = state.listProjects.findIndex(project => project.id === projectId);
      if (projectIndex !== -1) {
        state.listProjects[projectIndex].viewer += 1;
      }
    },

    markProjectAsDone: (state, action) => {
      const { projectId } = action.payload;
      const projectIndex = state.listProjects.findIndex(project => project.id === projectId);
      if (projectIndex !== -1) {
        state.listProjects.splice(projectIndex, 1);
      }
    },
  },
});

export const { getProjects, addProject, incrementViewerCount ,markProjectAsDone  } = projectsSlice.actions;
export default projectsSlice.reducer;
