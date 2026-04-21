import axios from "axios";

const getChats = async () => {
  const response = await axios.get("/api/users/messages", {
    withCredentials: true,
  });
  // console.log("response", response.data.messages);
  return response.data.messages;
};

const getChatMessages = async (userId) => {
  const response = await axios.get(
    "/api/users/messages/" + userId,
    {
      withCredentials: true,
    },
  );
  return response.data.chats;
};

export { getChats, getChatMessages };
