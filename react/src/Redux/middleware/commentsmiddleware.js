import axios from "axios";
import { getComments } from "../reducers/CommentReducer";
export const getCommentsMidd = ({ dispatch, getState }) => next =>  action => {
    if (action.type === 'GET_COMMENTS') {
      axios
        .get('http://localhost:8585/api/comment/getComments')
        .then((response) =>{
            console.log('response.data',response.data)
            dispatch(getProjects(response.data));
        })
        .catch((error) =>{
            console.log('error faching comments',error)

        });
    }
  
    return next(action);
  };
  