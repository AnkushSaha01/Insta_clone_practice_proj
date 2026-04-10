import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    profile: {},
    followers: [],
    following: [],
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
        setFollowers: (state, action) => {
            state.followers = action.payload;
        },
        setFollowing: (state, action) => {
            state.following = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { setProfile, setFollowers, setFollowing, setLoading, setError } = profileSlice.actions;
export default profileSlice.reducer;