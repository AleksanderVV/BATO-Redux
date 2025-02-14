import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    drawersData: {},
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
// const accessories = (state = initialState, action) => {
//     switch (action.type) {
//         case 'UPDATE_DRAWERS_DATA':
//             return {
//                 ...state,
//                 drawersData: action.payload
//             }
//         default:
//             return state;
//     }
// }

export const {updateDrawersData, clearDrawersData} = accessories.actions;
export default accessories.reducer;
