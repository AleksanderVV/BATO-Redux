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

// const conditions = (state = initialState, action) => {
//     switch (action.type) {
//         case 'DATA_FETCHING':
//             return {
//                 ...state,
//                 process: 'loading'
//             }
//         case 'TOOLBOX_FETCHED':
//             return {
//                 ...state,
//                 process: 'confirmed'
//             }
//         case 'DATA_FETCHING_ERROR':
//             return {
//                 ...state,
//                 process: 'error'
//             }
//         case 'CHECK_IS_MOBILE':
//             return {
//                 ...state,
//                 isMobile: action.isMobile
//             }
//         case 'CHECK_IS_STICKY':
//             return {
//                 ...state,
//                 isSticky: action.isSticky
//             }
//         case 'CHECK_IS_MENU_OPEN':
//             return {
//                 ...state,
//                 isMenuOpen: action.isMenuOpen
//             }
//         case 'CHECK_IS_MOBILE_OPEN':
//             return {
//                 ...state,
//                 isMobileOpen: action.isMobileOpen
//             }
//         default: return state
//     }
// }

export const { 
                dataFetching, 
                dataFetched, 
                dataFetchingError, 
                checkIsMobile, 
                checkIsSticky, 
                checkIsMenuOpen, 
                checkIsMobileOpen } = conditions.actions;

export default conditions.reducer;