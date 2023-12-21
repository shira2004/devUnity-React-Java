import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './reducers/ProjectsReducer';
import CategoryReducer from './reducers/CaregoriesReducer';
import { getCategoriesMidd } from './middleware/categoriesmiddleware';
import { getProjectMidd } from './middleware/projectsmiddleware';

export const store = configureStore({
  reducer: {
    project: projectsReducer,
    categories: CategoryReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    getCategoriesMidd,
    getProjectMidd,
  ],
});
