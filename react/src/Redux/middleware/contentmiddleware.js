import axios from "axios";

import { getContents ,addContent , deleteContent} from "../reducers/ContentReducer";
export const getContentMidd = ({ dispatch, getState }) => next =>  action => {
    if (action.type === 'GET_CONTENTS') {
      axios
        .get('http://localhost:8585/api/content/getContents')
        .then((response) =>{
            dispatch(getContents(response.data));
        })
        .catch((error) =>{
            console.log('error faching contents',error)

        });
    }
  else if(action.type === 'POST_CONTENTS') {
    const newTask = action.payload;

    axios.post('http://localhost:8585/api/content/postContent', newTask)
      .then((response) => {
        dispatch(addContent(response.data));  

      })
      .catch((error) => {
        console.error('Error', error);
      });
  }
  else if (action.type === 'DELETE_CONTENT') {
    const contentId = action.payload;
    
    axios.delete(`http://localhost:8585/api/content/deleteTask/${contentId}`)
      .then(() => {
        dispatch(deleteContent(contentId));
      })
      .catch((error) => {
        console.log('Error deleting content', error);
      });
    }
    return next(action);
  };
  