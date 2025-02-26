import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toolboxList: [],
    currentToolbox: null,
    toolboxFilters: {
        wheels: 'all',
        color: 'all',
        numberDrawers: 'all'
    }
}

const toolbox = createSlice({
    name: "toolbox",
    initialState,
    reducers: {
        toolboxFetched: (state, action) => {
            state.toolboxList = action.payload;
        },
        toolboxChoose: (state, action) => {
            console.log(action.payload);
            
            state.currentToolbox = action.payload;
        },
        updateToolboxFilter: (state, action) => {
            const { filterType, value } = action.payload;            
            state.toolboxFilters[filterType] = value;
        }
    }
});

// const toolbox = (state = initialState, action) => {
//     switch (action.type) {
//         case 'TOOLBOX_FETCHED':
//             return {
//                 ...state,
//                 toolboxList: action.payload
//             }
//         case 'TOOLBOX_CHOOSE':
//             return {
//                 ...state,
//                 currentToolbox: action.payload
//             }
//         case 'UPDATE_TOOLBOX_FILTER':
//             return {
//                 ...state,
//                 toolboxFilters: {
//                     ...state.toolboxFilters,
//                     [action.payload.filterType]: action.payload.value
//                 }
//             }
//         default: return state
//     }
// }

export const { toolboxFetched, toolboxChoose, updateToolboxFilter } = toolbox.actions;

export default toolbox.reducer;