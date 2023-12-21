import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ListCategories:[],
}
export const categorySlice = createSlice({
    name : 'category',
    initialState,
    reducers:{
        getCategories:(state , action) =>{
            state.ListCategories=(action.payload);
        },
        
    },
})

export const {getCategories } = categorySlice.actions
export default categorySlice.reducer