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
            state.currentToolbox = action.payload;
        },
        updateToolboxFilter: (state, action) => {
            const { filterType, value } = action.payload;            
            state.toolboxFilters[filterType] = value;
        }
    }
});

export const { toolboxFetched, toolboxChoose, updateToolboxFilter } = toolbox.actions;

export default toolbox.reducer;