import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './reducers/ProjectsReducer';
import CategoryReducer from './reducers/CaregoriesReducer';
import usersReducer from './reducers/UserReducer';
import CommentReducer from './reducers/CommentReducer';
import ContentReducer from './reducers/ContentReducer';
import { getCategoriesMidd } from './middleware/categoriesmiddleware';
import { getProjectMidd } from './middleware/projectsmiddleware';
import { getCommentsMidd } from './middleware/commentsmiddleware';
import { signUpUserMidd } from './middleware/usermiddleware'
import { getContentMidd } from './middleware/contentmiddleware';

export const store = configureStore({
  reducer: {
    project: projectsReducer,
    comment:CommentReducer,
    categories: CategoryReducer,
    user: usersReducer,
    content:ContentReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({serializableCheck:false}),
    getCategoriesMidd,
    getCommentsMidd,
    getProjectMidd,
    signUpUserMidd, 
    getContentMidd,
  ],
});