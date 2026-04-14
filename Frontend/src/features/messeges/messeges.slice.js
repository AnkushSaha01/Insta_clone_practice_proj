import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [],
  currentChatId: null,
};

const messegesSlice = createSlice({
  name: "messeges",
  initialState,
  reducers: {
    setChats: (state, actions) => {
      const users = actions.payload;
      state.chats = users.map(user => ({ ...user, messages: [] }));
    },
    setCurrentChatId: (state, action) => {
      state.currentChatId = action.payload;
    },
    appendMessage: (state, action) => {
      const { message, receiverId, senderId, currentChatId } = action.payload;

      const chat = state.chats.find(c => c._id === currentChatId);
      if (chat) {
        chat.messages.push({
          message,
          receiver: receiverId,
          sender: senderId,
        });
      }
    },
  },
});

export const { setChats, setCurrentChatId, appendMessage } =
  messegesSlice.actions;
export default messegesSlice.reducer;
