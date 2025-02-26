import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    process: 'waiting',
    isMobile: false,
    isSticky: false,
    isMenuOpen: false,
    isMobileOpen: false
}

const conditions = createSlice({
    name: "conditions",
    initialState,
    reducers: {
        dataFetching: (state) => {
            state.process = 'loading';
        },
        dataFetched: (state) => {
            state.process = 'confirmed';
        },
        dataFetchingError: (state) => {
            state.process = 'error';
        },
        checkIsMobile: (state, action) => {
            state.isMobile = action.payload;
        },
        checkIsSticky: (state, action) => {
            state.isSticky = action.payload;
        },
        checkIsMenuOpen: (state, action) => {
            state.isMenuOpen = action.payload;
        },
        checkIsMobileOpen: (state, action) => {
            state.isMobileOpen = action.payload;
        }
    }
});

export const { 
                dataFetching, 
                dataFetched, 
                dataFetchingError, 
                checkIsMobile, 
                checkIsSticky, 
                checkIsMenuOpen, 
                checkIsMobileOpen } = conditions.actions;

export default conditions.reducer;