import axios from "axios";
import { getComments,addComment } from "../reducers/CommentReducer";
export const getCommentsMidd = ({ dispatch, getState }) => next =>  action => {
    if (action.type === 'GET_COMMENTS') {
      axios
        .get('http://localhost:8585/api/comment/getComments')
        .then((response) =>{
            console.log('response.data',response.data)
            dispatch(getComments(response.data));
        })
        .catch((error) =>{
            console.log('error faching comments',error)

        });
    }
    else if (action.type === 'ADD_COMMENT') {
      axios
      .post('http://localhost:8585/api/comment/uploadComment',action.payload)
      .then((response) =>{
        console.log('yeyyyy i am in the way');
          console.log('response.data',response.data)
          dispatch(addComment(response.data));
      }) 
      .catch((error) =>{
        console.log('ooopppss i am in the error');
          console.log('error faching comments',error)

      });


    }
  
    return next(action);
  };
  