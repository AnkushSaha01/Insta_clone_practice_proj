import { useDispatch } from "react-redux";
import getMessages from "../service/messeges.api";
import { setMessages, setCurrentChatId } from "../messeges.slice";

const useMesseges = () => {
    const dispatch = useDispatch();

    const handleGetMessages = async () => {
        const response = await getMessages();
        dispatch(setMessages(response));
    }
    function handleSetCurrentChatId(userId) {
        dispatch(setCurrentChatId(userId))
    }

    return {
        handleGetMessages,
        handleSetCurrentChatId
    }
}

export default useMesseges;