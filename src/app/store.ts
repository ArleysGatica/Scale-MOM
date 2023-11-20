import { configureStore } from "@reduxjs/toolkit";
import {DrReducer} from './slice/doctorSlice';

export const store = configureStore({
    reducer: {
        doctors: DrReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
