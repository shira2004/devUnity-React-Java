import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './reducers/ProjectsReducer';
import CategoryReducer from './reducers/CaregoriesReducer';
import usersReducer from './reducers/UserReducer';
import CommentReducer from './reducers/CommentReducer';
import { getCategoriesMidd } from './middleware/categoriesmiddleware';
import { getProjectMidd } from './middleware/projectsmiddleware';
import { getCommentsMidd } from './middleware/commentsmiddleware';
import { signUpUserMidd } from './middleware/usermiddleware'

export const store = configureStore({
  reducer: {
    project: projectsReducer,
    comment:CommentReducer,
    categories: CategoryReducer,
    user: usersReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    getCategoriesMidd,
    getCommentsMidd,
    getProjectMidd,
    signUpUserMidd, 
  ],
});