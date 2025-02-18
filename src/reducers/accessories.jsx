import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
    drawersData: {},
    selectedAttachedAcc: [],
    quantityItems: 0
}

const accessories = createSlice({
    name: "accessories",
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
        },
        setQuantityItems: (state, action) => {
            state.quantityItems = action.payload;
        }
    }
});

export const {updateDrawersData, clearDrawersData, resetCurrentDrawer, setQuantityItems} = accessories.actions;

export const selectQuantityItems = createSelector(
    state => state.accessories.selectedAttachedAcc,
    state => state.accessories.drawersData,
    (selectedAttachedAcc, drawersData) => {
        return selectedAttachedAcc.length + Object.values(drawersData).reduce((sum, array) => sum + array.length, 0);
    }
);

export default accessories.reducer;
