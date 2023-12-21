import axios from 'axios';
import { getProjectsByCategory } from "../reducers/ProjectsReducer";

export const getProjectMidd = ({ dispatch, getState }) => next => async action => {
  if (action.type === 'GET_PROJECTS') {
    try {
      const { categoryId } = action.payload; // Extract categoryId from action payload
      const response = await axios.get(`http://localhost:8585/api/projects/getByCategory/${categoryId}`);
      console.log('Projects Response:', response.data);

      // Dispatch the action to update the Redux state with projects
      dispatch(getProjectsByCategory(response.data));
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  }

  return next(action);
};
