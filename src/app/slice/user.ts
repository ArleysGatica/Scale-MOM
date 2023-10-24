import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchDoctorById, fetchCreateDoctor, fetchDeleteDoctor } from "../../services";
import { IGeneralState, IDoctor } from "../../types/types";

const initialState: IGeneralState = {
    adduserUse: false,
    userUse: [],
    dataGeneral: [],
    status: "idle",
};

export const fetchDoctorByIdAsync = createAsyncThunk("doctors/id", async (id: string) => {
    const response = await fetchDoctorById(id);
    return response;
});

export const addDoctor = createAsyncThunk("doctors/add", async (doctor: IDoctor) => {
    const response = await fetchCreateDoctor(doctor);
    return response;
});

export const deleteDoctor = createAsyncThunk("doctors/delete", async (id: string) => {
    const response = await fetchDeleteDoctor(id);
    return response;
});

export const doctorsSlice = createSlice({
    name: "doctors",
    initialState,
    reducers: {
        AddingDoctor: (state, { payload }: PayloadAction<Array<IDoctor>>) => {
            state.userUse = payload;
        },

        RemoveDoctor: (state, { payload }: PayloadAction<Array<IDoctor>>) => {
            state.userUse = payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDoctorByIdAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchDoctorByIdAsync.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.dataGeneral = action.payload;
            })
            .addCase(fetchDoctorByIdAsync.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(addDoctor.fulfilled, (state, { payload }: PayloadAction<IDoctor>) => {
                state.dataGeneral = [...state.dataGeneral, payload]
            })
            .addCase(deleteDoctor.fulfilled, (state, { payload }: PayloadAction<IDoctor>) => {
                state.dataGeneral = state.dataGeneral.filter((doctor) => doctor.id !== payload.id)
            })
    },

});

export const { AddingDoctor, RemoveDoctor } = doctorsSlice.actions;
export const DrReducer = doctorsSlice.reducer;
