import axios from 'axios';
import { setUser } from '../reducers/UserReducer';

export const signUpUserMidd = ({ dispatch, getState }) => next => action => {
  if (action.type === 'ADD_USER') {
    const newUser = action.payload;
    console.log('newUser', newUser);

    axios.post('http://localhost:8585/api/users/createUser', newUser)
      .then((response) => {
        console.log('response.data', response.data);
        dispatch(setUser(response.data));
      })
      .catch((error) => {
        console.error('Error', error);
      });
  }
  else if (action.type === 'SIGN_IN') {
    const newUser = action.payload;
    console.log('entered user', newUser);
    console.log('i am in middleware')

    axios.post('http://localhost:8585/api/users/signIn', newUser)
      .then((response) => {
        console.log('response.data', response.data);
        console.log('before dispatch');
        dispatch(setUser(response.data));  // Here was the issue
        console.log('after dispatch');
      })
      .catch((error) => {
        console.log('in catch ...');
        console.error('Error', error);
      });
  }
  return next(action);
};

