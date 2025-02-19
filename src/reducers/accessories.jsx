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
        setSelectedAttachedAcc: (state, action) => {
            const id = action.payload;
            if (state.selectedAttachedAcc.includes(id)) {
                state.selectedAttachedAcc = state.selectedAttachedAcc.filter(accId => accId !== id);
            } else {
                state.selectedAttachedAcc = [...state.selectedAttachedAcc, id];
            }
        },
        clearSelectedAttachedAcc: (state) => {
            state.selectedAttachedAcc = [];
        }
    }
});

export const {
                updateDrawersData, 
                clearDrawersData, 
                resetCurrentDrawer, 
                setSelectedAttachedAcc,
                clearSelectedAttachedAcc} = accessories.actions;

export const selectQuantityItems = createSelector(
    state => state.accessories.selectedAttachedAcc,
    state => state.accessories.drawersData,
    (selectedAttachedAcc, drawersData) => {
        return selectedAttachedAcc.length + Object.values(drawersData).reduce((sum, array) => sum + array.length, 0);
    }
);

export default accessories.reducer;
