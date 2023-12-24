// usermiddleware.js
import axios from 'axios';
import { setUser } from '../reducers/UserReducer';

export const signUpUserMidd = ({ dispatch, getState }) => next => action => {
  if (action.type === 'ADD_USER') {
    const newUser = action.payload;
    console.log('newUser', newUser);

    axios.post('http://localhost:8585/api/users/createUser', newUser)
      .then((response) => {
        console.log('response.data', response.data);
        dispatch(setUser(response.data));  // Here was the issue
      })
      .catch((error) => {
        console.error('Error', error);
      });
  }
  return next(action);
};

export const signInUserMidd = ({ dispatch, getState }) => next => action => {
  if (action.type === 'ADD_USER') {
    const newUser = action.payload;
    console.log('newUser', newUser);

    axios.post('http://localhost:8585/api/users/createUser', newUser)
      .then((response) => {
        console.log('response.data', response.data);
        dispatch(setUser(response.data));  // Here was the issue
      })
      .catch((error) => {
        console.error('Error', error);
      });
  }
  return next(action);
};
