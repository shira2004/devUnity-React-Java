import  {configureStore} from '@reduxjs/toolkit';

import ItemReducer from './reducers/ItemReducer';

export const store = configureStore({
    reducer:{
        myItem:ItemReducer,
    },
})