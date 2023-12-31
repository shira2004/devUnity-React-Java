import axios from "axios";

import { getContents ,addContent , deleteContent} from "../reducers/ContentReducer";
export const getContentMidd = ({ dispatch, getState }) => next =>  action => {
    if (action.type === 'GET_CONTENTS') {
      axios
        .get('http://localhost:8585/api/content/getContents')
        .then((response) =>{
            console.log('response.data',response.data)
            dispatch(getContents(response.data));
        })
        .catch((error) =>{
            console.log('error faching contents',error)

        });
    }
  else if(action.type === 'POST_CONTENTS') {
    const newTask = action.payload;
    console.log('entered newTask', newTask);
    console.log('i am in middleware')

    axios.post('http://localhost:8585/api/content/postContent', newTask)
      .then((response) => {
        console.log('response.data', response.data);
        console.log('before dispatch');
        dispatch(addContent(response.data));  
        console.log('after dispatch');
      })
      .catch((error) => {
        console.log('in catch ...');
        console.error('Error', error);
      });
  }
  else if (action.type === 'DELETE_CONTENT') {
    const contentId = action.payload;
    
    axios.delete(`http://localhost:8585/api/content/deleteTask/${contentId}`)
      .then(() => {
        console.log('Deleted content with id:', contentId);
        dispatch(deleteContent(contentId));
      })
      .catch((error) => {
        console.log('Error deleting content', error);
      });
    }
    return next(action);
  };
  