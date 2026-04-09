import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profile: {},
    loading: false,
    error: null,
}

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setProfile: (state, action) => {
            state.profile = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setProfile, setLoading, setError } = profileSlice.actions;
export default profileSlice.reducer;