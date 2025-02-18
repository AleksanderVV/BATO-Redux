import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    drawersData: {},
    quantityAcc: 0
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
        updateQuantityAcc: (state, action) => {
            state.quantityAcc = action.payload;
        }
    }
});

export const {updateDrawersData, clearDrawersData, resetCurrentDrawer, updateQuantityAcc} = accessories.actions;
export default accessories.reducer;
