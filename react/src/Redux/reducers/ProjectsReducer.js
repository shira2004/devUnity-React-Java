import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ListProjects:[],
}
export const projectSlice = createSlice({
    name : 'project',
    initialState,
    reducers:{
        getPtojects:(state , action) =>{
            state.ListProjects=(action.payload);
        },
        addProject:(state , action) =>{
            state.ListProjects.push(action.payload);
        },
    },
})

export const {getPtojects , addProject} = projectSlice.actions
export default projectSlice.reducer