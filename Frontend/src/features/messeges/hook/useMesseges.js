import { useDispatch } from "react-redux";
import getChats from "../service/messeges.api";
import { setChats, setCurrentChatId, appendMessage } from "../messeges.slice";

const useMesseges = () => {
    const dispatch = useDispatch();

    const handleGetChats = async () => {
        const response = await getChats();
        dispatch(setChats(response));
    }
    function handleSetCurrentChatId(userId) {
        dispatch(setCurrentChatId(userId))
    }
    function handleAppendMessage({ message, receiverId, senderId, currentChatId }) {
        dispatch(appendMessage({ message, receiverId, senderId, currentChatId }))
    }

    return {
        handleGetChats,
        handleSetCurrentChatId,
        handleAppendMessage
    }
}

export default useMesseges;