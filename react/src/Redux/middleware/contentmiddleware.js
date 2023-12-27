import axios from "axios";

import { getContents } from "../reducers/ContentReducer";
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
  
    return next(action);
  };
  