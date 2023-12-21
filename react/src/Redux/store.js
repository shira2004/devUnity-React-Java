import { configureStore } from '@reduxjs/toolkit';

import ProjectsReducer from './reducers/ProjectsReducer';
import CategoryReducer from './reducers/CaregoriesReducer';
import { getCategoriesMidd } from './middleware/categoriesmiddleware';


export const store = configureStore({
  reducer: {
   projects:ProjectsReducer,
   categories:CategoryReducer,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), getCategoriesMidd],


})

