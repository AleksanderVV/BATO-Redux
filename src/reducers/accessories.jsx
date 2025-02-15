import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    drawersData: {}
}

const accessories = createSlice({
    name: "drawers",
    initialState,
    reducers: {
        updateDrawersData: (state, action) => {
            state.drawersData = action.payload; 
        },
        clearDrawersData: (state) => {
            state.drawersData = {}; 
        },
        resetCurrentDrawer: (state, action) => {
            delete state.drawersData[action.payload]; 
        }
    }
});

export const {updateDrawersData, clearDrawersData, resetCurrentDrawer} = accessories.actions;
export default accessories.reducer;
