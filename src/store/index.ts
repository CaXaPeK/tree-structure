import {configureStore} from "@reduxjs/toolkit";
import {uiSlice} from './uiSlice.ts';
import {treeSlice} from "./treeSlice.ts";

export const store = configureStore({
    reducer: { ui: uiSlice.reducer, tree: treeSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;