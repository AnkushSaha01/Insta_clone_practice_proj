import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages: [],
    currentChatId: null
}

const messegesSlice = createSlice({
    name: "messeges",
    initialState,
    reducers: {
        setMessages: (state, actions) => {
            state.messages = actions.payload;
        },
        setCurrentChatId: (state, action) => {
            state.currentChatId = action.payload
        }
    }
})

export const { setMessages, setCurrentChatId } = messegesSlice.actions;
export default messegesSlice.reducer;