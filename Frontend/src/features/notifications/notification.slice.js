import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        followReqs: [],
    },
    reducers: {
        setFollowReqs: (state, action) => {
            state.followReqs= action.payload;
        },
    },
});

export const { setFollowReqs } = notificationSlice.actions;
export default notificationSlice.reducer;