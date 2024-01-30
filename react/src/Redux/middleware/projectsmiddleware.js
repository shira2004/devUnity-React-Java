import axios from "axios";
import { getProjects, addProject , incrementViewerCount , markProjectAsDone } from "../reducers/ProjectsReducer";
import { addContent } from "../reducers/ContentReducer";

export const getProjectMidd = ({ dispatch, getState }) => next => action => {
  if (action.type === 'GET_PROJECTS') {
    axios
      .get('http://localhost:8585/api/projects/getAllDTO')
      .then((response) => {
        dispatch(getProjects(response.data));
      })
      .catch((error) => {
        console.error('Error fetching projects', error);
      });
  } else if (action.type === 'ADD_PROJECT') {
    const newProject = action.payload.project;
    axios
      .post('http://localhost:8585/api/projects/UploadProject', newProject)
      .then((response) => {
        const good_id =response.data.id;
        dispatch(addProject(response.data));

        action.payload.content.map((item, index) => {
          const [title, content] = item.split(':');
          const objectToSend = {
            title: title,
            text: content,
            numRow: index,
            project: {id: good_id},
          };
          axios
            .post('http://localhost:8585/api/content/postContent', objectToSend)
            .then((response) => {
              dispatch(addContent(response.data));
            })
            .catch((error) => {
            });
        });
      })
      .catch((error) => {
        console.log('Error adding projects', error);
      });
  }else if (action.type === 'INCREMENT_VIEWER_COUNT') {
    axios
      .put(`http://localhost:8585/api/projects/incrementViewerCount/${action.payload.id}`)
      .then((response) => {
        console.log(response.data);
        dispatch(incrementViewerCount({ id: action.payload.id }));
      })
      .catch((error) => {
        console.error('Error incrementing viewer count', error);
      });
  }else if (action.type === 'MARK_PROJECT_AS_DONE') {
    axios
      .put(`http://localhost:8585/api/projects/changeStatus/${action.payload.id}`)
      .then((response) => {
        dispatch(markProjectAsDone({ id: action.payload.id }));
        console.log(response.data);
        console.log(response.status);
      })
      .catch((error) => {
        console.error('Error mark as done ', error);
      });
  }

  return next(action);
};
