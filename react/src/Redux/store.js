import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './reducers/ProjectsReducer';
import CategoryReducer from './reducers/CaregoriesReducer';
import usersReducer from './reducers/UserReducer';
import { getCategoriesMidd } from './middleware/categoriesmiddleware';
import { getProjectMidd } from './middleware/projectsmiddleware';
import { signUpUserMidd } from './middleware/usermiddleware'

export const store = configureStore({
  reducer: {
    project: projectsReducer,
    categories: CategoryReducer,
    user: usersReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    getCategoriesMidd,
    getProjectMidd,
    signUpUserMidd, 
  ],
});