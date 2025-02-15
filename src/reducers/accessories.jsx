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
        }
    }
});

export const {updateDrawersData, clearDrawersData} = accessories.actions;
export default accessories.reducer;
