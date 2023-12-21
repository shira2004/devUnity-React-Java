import axios from "axios";
import { getCategories } from "../reducers/CaregoriesReducer";

export const getCategoriesMidd=({dispatch,getstate}) =>next =>action=>{
    if (action.type ==='GET_CATEGORY'){
        axios
        .get('http://localhost:8585/api/categories/getCategoris')
        .then((response) =>{
            console.log('response.data',response.data)
            dispatch(getCategories(response.data));
        })
        .catch((error) =>{
            console.log('error faching categories',error)

        });
    }
    return next(action);
}