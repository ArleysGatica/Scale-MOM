import { configureStore } from "@reduxjs/toolkit";
import {DrReducer} from '../app/slice/user';

export const store = configureStore({
    reducer: {
        doctors: DrReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
