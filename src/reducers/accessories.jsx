import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";
import { getAccessoriesDirect, getAttachingAccessoriesDirect } from "../services/ToolboxService";

export const onRequest = createAsyncThunk(
    "accessories/onRequest",
    async (_, { rejectWithValue }) => {
        try {
            const acc = await getAccessoriesDirect();
            const attachingAcc = await getAttachingAccessoriesDirect();

            return { acc, attachingAcc };
        } catch (error) {
            return rejectWithValue('Failed to fetch accessories');
        }
    }
);

const initialState = {
    drawersData: {},
    selectedAttachedAcc: [],
    quantityItems: 0,
    accessories: [],
    filteredAccessories: [],
    attachingAccessories: [],
    loading: false,
    error: null,
    fullPrice: 0,
    currentDrawer: 0,
    openChooseDrawers: false
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
        },
        setAccessories: (state, action) => {
            state.accessories = action.payload;
        },
        setFilteredAccessories: (state, action) => {
            state.filteredAccessories = action.payload;
        },
        setFullPrice: (state, action) => {
            state.fullPrice = action.payload;
        },
        setCurrentDrawer: (state, action) => {
            state.currentDrawer = action.payload;
        },
        deleteAcc: (state, action) => {
        
            const { drawerAcc, idAcc } = action.payload;
        
            if (!state.drawersData[drawerAcc]) {
                console.error(`❌ Drawer ${drawerAcc} не найден.`);
                return;
            }
        
            const newDrawersData = { ...state.drawersData };
        
            newDrawersData[drawerAcc] = newDrawersData[drawerAcc].filter(i => i.id !== idAcc);
        
            if (newDrawersData[drawerAcc].length === 0) {
                delete newDrawersData[drawerAcc];
            }
        
            state.drawersData = newDrawersData;
        },
        setIsOpenChooseDrawers: (state, action) => {
            state.openChooseDrawers = action.payload;
        }
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(onRequest.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(onRequest.fulfilled, (state, action) => {
                state.loading = false;
                state.accessories = action.payload.acc;
                state.filteredAccessories = action.payload.acc;
                state.attachingAccessories = action.payload.attachingAcc;
            })
            .addCase(onRequest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const {
                updateDrawersData, 
                clearDrawersData, 
                resetCurrentDrawer, 
                setSelectedAttachedAcc,
                clearSelectedAttachedAcc,
                setFilteredAccessories,
                setAccessories,
                setFullPrice,
                setCurrentDrawer,
                deleteAcc,
                setIsOpenChooseDrawers
            } = accessories.actions;

export const selectQuantityItems = createSelector(
    state => state.accessories.selectedAttachedAcc,
    state => state.accessories.drawersData,
    (selectedAttachedAcc, drawersData) => {
        return selectedAttachedAcc.length + Object.values(drawersData).reduce((sum, array) => sum + array.length, 0);
    }
);

export default accessories.reducer;
