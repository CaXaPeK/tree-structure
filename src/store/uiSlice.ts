import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type UiMode = 'NONE' | 'ADD' | 'EDIT' | 'REMOVE';

interface UiState {
    mode: UiMode;
    selectedNodeId: string | null;
}

const initialState: UiState = { mode: 'NONE', selectedNodeId: null };

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setMode: (state, action: PayloadAction<UiMode>) => {
            state.mode = action.payload;
        },
        clearMode: (state) => {
            state.mode = 'NONE';
        },
        selectNode: (state, action: PayloadAction<string | null>) => {
            state.selectedNodeId = action.payload;
        },
        deselectNode: (state) => {
            state.selectedNodeId = null;
        }
    }
})

export const { setMode, clearMode, selectNode, deselectNode } = uiSlice.actions;
export default uiSlice.reducer;