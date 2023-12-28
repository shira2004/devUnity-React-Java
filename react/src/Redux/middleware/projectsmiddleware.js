import axios from "axios";
import { getProjects, addProject } from "../reducers/ProjectsReducer";
import { addContent } from "../reducers/ContentReducer";

export const getProjectMidd = ({ dispatch, getState }) => next => action => {
  if (action.type === 'GET_PROJECTS') {
    console.log('I am in middleware');
    axios
      .get('http://localhost:8585/api/projects/getAllDTO')
      .then((response) => {
        console.log('response.data', response.data);
        dispatch(getProjects(response.data));
      })
      .catch((error) => {
        console.log('I am in middleware catch');
        console.error('Error fetching projects', error);
      });
  } else if (action.type === 'ADD_PROJECT') {
    const newProject = action.payload.project;
    console.log('newProject', newProject);
    axios
      .post('http://localhost:8585/api/projects/UploadProject', newProject)
      .then((response) => {
        console.log('response.data', response.data);


        const good_id =response.data.id;
        console.log('try to console proj id:');
        console.log(good_id);
        dispatch(addProject(response.data));

        action.payload.content.map((item, index) => {
          const [title, content] = item.split(':');
          const objectToSend = {
            title: title,
            text: content,
            numRow: index,
            project: {id: good_id},
          };
console.log(objectToSend);
          axios
            .post('http://localhost:8585/api/content/postContent', objectToSend)
            .then((response) => {
              console.log('response.data', response.data);
              dispatch(addContent(response.data));
            })
            .catch((error) => {
              console.log('In catch...');
              console.error('Error', error);
            });
        });
      })
      .catch((error) => {
        console.log('Error adding projects', error);
      });
  }

  return next(action);
};
