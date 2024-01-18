import axios from 'axios';
import { setUser } from '../reducers/UserReducer';

export const signUpUserMidd = ({ dispatch, getState }) => next => action => {
  if (action.type === 'ADD_USER') {
    const newUser = action.payload;

    axios.post('http://localhost:8585/api/users/createUser', newUser)
      .then((response) => {
        dispatch(setUser(response.data));
      })
      .catch((error) => {
        console.error('Error', error);
      });
  }
  else if (action.type === 'SIGN_IN') {
    const newUser = action.payload;


    axios.post('http://localhost:8585/api/users/signIn', newUser)
      .then((response) => {
        dispatch(setUser(response.data)); 
      })
      .catch((error) => {
        console.error('Error', error);
      });
  }
  return next(action);
};

