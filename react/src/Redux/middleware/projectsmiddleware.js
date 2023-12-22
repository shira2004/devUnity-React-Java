import axios from "axios";
export const getProjectMidd = ({ dispatch, getState }) => next => async action => {
    if (action.type === 'GET_PROJECTS') {
      try {
        const { categoryId } = action.payload;
        console.log('Fetching projects for categoryId:', categoryId);
  
        const response = await axios.get(`http://localhost:8585/api/projects/getByCategory/${categoryId}`);
        console.log('Projects Response:', response.data);
  
        // Dispatch the action to update the Redux state with projects
        dispatch({ type: 'project/getProjectsByCategory', payload: { categoryId, projects: response.data } });
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    }
  
    return next(action);
  };
  