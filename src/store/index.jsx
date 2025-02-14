import { configureStore } from "@reduxjs/toolkit";
import conditions from '../reducers/conditions';
import toolbox from '../reducers/toolbox';
import accessories from '../reducers/accessories';

const store = configureStore({
    reducer: {
                conditions, 
                toolbox, 
                drawers: accessories},
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;