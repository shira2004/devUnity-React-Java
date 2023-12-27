import axios from "axios";
import { getProjects } from "../reducers/ProjectsReducer";
import { addProject } from "../reducers/ProjectsReducer";
export const getProjectMidd = ({ dispatch, getState }) => next =>  action => {
    if (action.type === 'GET_PROJECTS') {
      axios
        .get('http://localhost:8585/api/projects/getAll')
        .then((response) =>{
            console.log('response.data',response.data)
            dispatch(getProjects(response.data));
        })
        .catch((error) =>{
            console.log('error faching projects',error)

        });
    }

    else if (action.type === 'ADD_PROJECT') {
    const newProject = action.payload;
    console.log('newProject', newProject);
    console.log("in function newProject");
           axios
          .post('http://localhost:8585/api/projects/createProject' , newProject)
          .then((response) =>{
            console.log('response.data',response.data)
            dispatch(addProject(response.data));
        })
            
          .catch((error) =>{
            console.log('error adding projects',error)

        });
      };

  
    return next(action);
  };
  