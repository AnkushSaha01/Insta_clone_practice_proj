import { useDispatch } from "react-redux";
import { getChats, getChatMessages } from "../service/messeges.api";
import {
  setChats,
  setCurrentChatId,
  appendMessage,
  setMessages,
} from "../messeges.slice";

const useMesseges = () => {
  const dispatch = useDispatch();

  const handleGetChats = async () => {
    const response = await getChats();
    dispatch(setChats(response));
  };
  async function handleSetCurrentChatId(userId) {
    dispatch(setCurrentChatId(userId));
    const data = await getChatMessages(userId);
    console.log(data)
    dispatch(setMessages({message:data, currentChatId:userId}));
  }
  function handleAppendMessage({
    message,
    receiverId,
    senderId,
    currentChatId,
  }) {
    dispatch(appendMessage({ message, receiverId, senderId, currentChatId }));
  }

  return {
    handleGetChats,
    handleSetCurrentChatId,
    handleAppendMessage,
  };
};

export default useMesseges;
